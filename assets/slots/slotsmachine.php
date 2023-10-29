<?php

class SlotsMachine {

	public static function MinBet($machineName) {
		return 1;
	}
	public static function MaxBet($machineName) {
		return 10;
	}
	public static function IconsPerReel($machineName) {
		return 6;
	}

	// Return which mechanism we'll use to determine random spins
	// Can be:
	//   - prize_odds: To configure the odds of each prize coming up, which then makes up the reel positions
	//   - reel_odds: To configure the odds of each reel position coming up, directly
	public static function RandomMechanism($machineName) {
		return "prize_odds";
	}

	// Use this function if you want to force a prize for a user under certain conditions, without going via the
	// normal prize selection process.
	// For example, you can use this to make every user win a small prize on their first spin, making them more likely
	// to keep playing.
	// If a forced prize should be returned, return its ID in the prizes table.
	// Return null to allow the slot machine to pick the prize as usual.
	public static function GetForcedPrize($userID, $machineName) {
		return null;
	}
	
	// This function gets called each time a user wins a prize. If your prizes are "numeric" in essence
	//   (amounts credited to an account, an increased "spin balance", etc), you probably don't need to modify
	//   this function. However, if your prizes are non-numeric (t-shirts, laptops, whatever), you will need to use
	//   this function to store *somewhere* in your database that the user won these, and act in consequence, since
	//   the slot machine is only prepared to store numeric prizes (credits, and lifetime_winnings)
	public static function PrizeWon($userID, $machineName, $prizeID) {
	}

	// Logs the details of the spin to the database. You may want to modify how this is logged.
	public static function LogSpin($userID, $machineName, $windowID, $action, $bet = null, $reel1 = null, $reel2 = null, $reel3 = null, $prizeID = null, $payoutCredits = null, $payoutWinnings = null) {
		$fields = "date, user_id, machine_name, window_id, action";
		$values = "now(), " . $userID . ", '" . DB::DQ($machineName) . "', '" . DB::DQ($windowID) . "', '" . DB::DQ($action) . "'";

		if ($bet != null) {
			$fields .= ", bet, reel1, reel2, reel3";
			$values .= ", " . $bet . ", " . $reel1 . ", " . $reel2 . ", " . $reel3;
		}
		if ($prizeID != null) {
			$fields .= ", prize_id, payout_credits, payout_winnings";
			$values .= ", " . $prizeID . ", " . $payoutCredits . ", " . $payoutWinnings;
			
			$sqlUpdate = "UPDATE mekashronsmartwinners_world.entities SET CustomField72 = CustomField72 + {$payoutWinnings} WHERE entityID = {$userID};";
			DB::Execute($sqlUpdate);
		}

		$sql = "INSERT INTO slotmachine_spins (" . $fields . ") VALUES (". $values .");";
		DB::Execute($sql);
	}

	//-----------------------------------------------------------------------------------
	// Internal Logic: You shouldn't need to modify the code below this line.
	//-----------------------------------------------------------------------------------

	public static function Spin($userID, $machineName, $bet, $windowID, $log = true) {
		$forcedPrizeID = self::GetForcedPrize($userID, $machineName);

		if ($forcedPrizeID != null) {
			$result = self::GetForcedSpin($machineName, $forcedPrizeID);
		} else {
			$randomMechanism = self::RandomMechanism($machineName);
			if ($randomMechanism == "reel_odds") {
				$result = array(
					'reels' => array(
						self::RandomReelSpin($machineName, 1),
						self::RandomReelSpin($machineName, 2),
						self::RandomReelSpin($machineName, 3)
					)
				);
			} elseif ($randomMechanism == "prize_odds") {
				$prizeID = self::RandomPrizeSpin($machineName);
				$result = self::GetForcedSpin($machineName, $prizeID);
			} else {
				throw new Exception("Invalid Random Mechanism");
			}
		}

		$result['prize'] = null;
		$prizeID = self::GetPrizeForReels($machineName, $result['reels']);
		if ($prizeID != null) {
			$prizeData = self::PrizeData($prizeID);
			$result['prize'] = array(
				'id' => $prizeID,
				'payoutCredits' => $prizeData['payout_credits'] * $bet,
				'payoutWinnings' => $prizeData['payout_winnings'] * $bet,
			);
			
			self::PrizeWon($userID, $machineName, $prizeID);
		}

		if ($log) {
			SlotsMachine::LogSpin($userID, $machineName, $windowID, "Spin", $bet,
				$result['reels'][0], $result['reels'][1], $result['reels'][2],
				($result['prize'] != null) ? $result['prize']['id'] : null,
				($result['prize'] != null) ? $result['prize']['payoutCredits'] : null,
				($result['prize'] != null) ? $result['prize']['payoutWinnings'] : null);
		}
		return $result;
	}

	public static function ListPrizesForRendering($machineName) {
		$prizes = array();
		foreach (self::PrizesForMachine($machineName) as $row) {
			$row['image1'] = self::_getImagePropertiesForPrizesList($row['reel1_unprocessed']);
			$row['image2'] = self::_getImagePropertiesForPrizesList($row['reel2_unprocessed']);
			$row['image3'] = self::_getImagePropertiesForPrizesList($row['reel3_unprocessed']);
			$prizes[] = $row;
		}
		return $prizes;
	}

	// Check whether the requested machine name is valid, and return it, or "default"
	public static function GetMachineName($machine_name_param) {
		$count = DB::Scalar("SELECT COUNT(*) FROM slotmachine_prizes WHERE machine_name = '". DB::DQ($machine_name_param) ."';");
		if ($count > 0) {
			return $machine_name_param;
		} else {
			return "default";
		}
	}

	//-------------------------------------------------------------------------------
	// Caching functions to save DB calls

	static $_PrizesCacheByMachine = array();
	static $_PrizesCacheByID = array();
	static $_PrizeOddsCache = array();
	static $_ReelsCache = array();

	private static function LoadPrizesCache() {
		$prizes = DB::FillArray("SELECT * FROM slotmachine_prizes ORDER BY id, payout_winnings DESC, payout_credits DESC;");
		foreach ($prizes as $row) {
			$row['reel1_unprocessed'] = $row['reel1'];
			$row['reel2_unprocessed'] = $row['reel2'];
			$row['reel3_unprocessed'] = $row['reel3'];
			$row['reel1'] = self::PreProcessReelRule($row['reel1']);
			$row['reel2'] = self::PreProcessReelRule($row['reel2']);
			$row['reel3'] = self::PreProcessReelRule($row['reel3']);

			if (!isset(self::$_PrizesCacheByMachine[$row['machine_name']])) { self::$_PrizesCacheByMachine[$row['machine_name']] = array(); }
			self::$_PrizesCacheByMachine[$row['machine_name']][] = $row;
			self::$_PrizesCacheByID[$row['id']] = $row;
		}
	}

	private static function PrizesForMachine($machineName) {
		if (!isset(self::$_PrizesCacheByMachine[$machineName])) { self::LoadPrizesCache(); }
		return self::$_PrizesCacheByMachine[$machineName];
	}

	private static function PrizeData($prizeID) {
		if (!isset(self::$_PrizesCacheByID[$prizeID])) { self::LoadPrizesCache(); }
		return self::$_PrizesCacheByID[$prizeID];
	}

	private static function ReelOddsTable($machineName, $reel) {
		$key = $machineName . "_" . $reel;
		if (!isset(self::$_ReelsCache[$key])) {
			$reelData = array();
			$totalWeight = 0;
			$result = DB::RS("SELECT outcome, probability FROM slotmachine_reels WHERE machine_name = '". DB::DQ($machineName) ."' AND reel = " . $reel . ";");
			while($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$totalWeight += $row["probability"];
				$row["accWeight"] = $totalWeight;
				$reelData[] = $row;
			}
			self::$_ReelsCache[$key] = $reelData;
		}
		return self::$_ReelsCache[$key];
	}

	private static function PrizeOddsTable($machineName) {
		if (!isset(self::$_PrizeOddsCache[$machineName])) {
			$prizeData = array();
			$totalWeight = 0;
			$result = DB::RS("SELECT id, probability FROM slotmachine_prizes WHERE machine_name = '". DB::DQ($machineName) ."';");
			while($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$totalWeight += $row["probability"];
				$row["accWeight"] = $totalWeight;
				$prizeData[] = $row;
			}
			self::$_PrizeOddsCache[$machineName] = $prizeData;
		}
		return self::$_PrizeOddsCache[$machineName];
	}

	//-------------------------------------------------------------------------------

	// Reel Odds: Find the outcome of each reel, given the probabilities specified for each reel position
	private static function RandomReelSpin($machineName, $reel) {
		$outcomes = self::ReelOddsTable($machineName, $reel);
		$totalWeight = $outcomes[count($outcomes) - 1]['accWeight'];

		$r = rand() * $totalWeight / getrandmax();
		for ($i=0; $i<count($outcomes); $i++) {
			if ($outcomes[$i]['accWeight'] >= $r) {
				return $outcomes[$i]['outcome'];
			}
		}
	}

	// Prize Odds: Find the prize given each prize's probabilities, return the ID or NULL if a losing spin.
	private static function RandomPrizeSpin($machineName) {
		$prizes = self::PrizeOddsTable($machineName);
		$r = rand() / getrandmax();
		for ($i=0; $i<count($prizes); $i++) {
			if ($prizes[$i]['accWeight'] >= $r) {
				return $prizes[$i]['id'];
			}
		}
		return null;
	}

	// Returns a valid reel combination given the requested prize.
	// If PrizeID is NULL, returns a losing combination.
	// The point of this function is that when I force the 3 reels to be each within the rule for the
	//   forzed prize, they may end up being in the rule for a HIGHER prize too, so I need to double check
	//   that the user is actually getting the prize we want, otherwise, the chance of getting one of the
	//   very high prizes is ENORMOUSLY greater than normal
	private static function GetForcedSpin($machineName, $forcedPrizeID) {
		$matchedPrizeID = -1;
		$count = 0;

		if ($forcedPrizeID != null) {
			$rowForcedPrize = self::PrizeData($forcedPrizeID);
		} else {
			$rowForcedPrize = array('reel1' => '*', 'reel2' => '*', 'reel3' => '*'); // Ask for anything, really
		}

		while ($matchedPrizeID != $forcedPrizeID) {
			$reels = array('reels' => array(
				self::ForcedReelSpin($machineName, $rowForcedPrize['reel1']),
				self::ForcedReelSpin($machineName, $rowForcedPrize['reel2']),
				self::ForcedReelSpin($machineName, $rowForcedPrize['reel3'])
			));
			$matchedPrizeID = self::GetPrizeForReels($machineName, $reels['reels']);

			$count++;
			if ($count > 100) { break; } // If after 100 tries we didn't get it, move on, it just didn't work.
		}

		return $reels;
	}

	// Force a reel to comply with a certain rule
	// The correct way would be to "generate" a reel, but it's easier to just randomize and compare.
	private static function ForcedReelSpin($machineName, $rule) {
		$randMax = self::IconsPerReel($machineName) * 2 + 1; // *2 because of blank spaces, +1 because of the last blank space (there is no 0.5, it's ICONS_PER_REEL.5)
		$reel = rand(2, $randMax) / 2;
		$count = 0;
		while (!self::CompareReel($reel, $rule)) {
			$reel = rand(2, $randMax) / 2;
			$count++;
			if ($count > 100) { break; } // If after 100 tries we didn't get it, move on, it just didn't work.
		}
		return $reel;
	}

	// Given a combination of reels, find the corresponding prize
	private static function GetPrizeForReels($machineName, $reels) {
		$prizes = self::PrizesForMachine($machineName);
		foreach ($prizes as $row) {
			if (self::CompareReel($reels[0], $row['reel1']) &&
				self::CompareReel($reels[1], $row['reel2']) &&
				self::CompareReel($reels[2], $row['reel3'])
				) {
				return $row['id'];
			}
		}
		return null;
	}

	// outcome is the actual rolled value of the reel (float)
	// rule is either:
	//		* (anything)
	//      *.0 (any non-blank)
	//		*.5 (any blank)
	//		A float (the actual outcome)
	//		Several of these separated by '/'
	private static function CompareReel($outcome, $rule) {
		if ($rule == "*") { return true; }
		if ($rule == "*.0") { return ($outcome == ((int) $outcome)); }
		if ($rule == "*.5") { return ($outcome != ((int) $outcome)); }

		if (is_array($rule)) {
			foreach ($rule as $v) {
				if (self::CompareReel($outcome, $v) == true) { return true; }
			}
			return false;
		}

		return ($outcome == $rule);
	}

	// Receives a rule as specified in the DB, and splits it, trims it, etc, so we don't have
	// to do it every time on CompareReel
	private static function PreProcessReelRule($rule) {
		$rules = explode("/", $rule);
		$rules = array_map('trim', $rules);
		if (count($rules) == 1) {
			$rules = $rules[0];
		}
		return $rules;
	}

	private static function _getImagePropertiesForPrizesList($rule) {
		return array('image_name'=> 'prize_' . str_replace(array(" ","*",".","/"), array("","star","dot","slash"), $rule));
	}
}