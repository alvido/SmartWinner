<?php

class Users {

	// This function gets called *a lot*, so it must be very quick to run. Cache stuff if necessary.
	public static function LoggedUserID() {
		if (isset($_GET['GUID'])) {
				$userData =  DB::SingleRow("SELECT id FROM slotmachine_users WHERE HEX(GUID) = hex('" . DB::DQ($_GET['GUID']) . "');");
				if (!is_null($userData) && !empty($userData['id'])) {
					$_SESSION['userID'] = $userData['id'];
					return $userData['id'];
				}
		}
		else if (isset($_SESSION['userID'])) {
			return $_SESSION['userID'];
		} 
		
		return null;
	}

	// Must return credits, day_winnings and lifetine_winnings
	// Day_winnings may be implemented in multiple different ways. The server doesn't implement them as-is
	public static function GetUserData($userID) {
		return DB::SingleRow("SELECT credits, 0 AS day_winnings, lifetime_winnings FROM slotmachine_users WHERE id = " . DB::DQ($userID) . ";");
	}

	public static function IncrementSlotMachineSpins($userID) {
		DB::Execute("UPDATE slotmachine_users SET spins = spins + 1 WHERE id = " . DB::DQ($userID) . ";");
	}

	public static function DeductCredits($userID, $bet) {
		DB::Execute("UPDATE slotmachine_users SET credits = credits - " . DB::DQ($bet) . " WHERE id = " . DB::DQ($userID) . ";");
		// If you have any sort of audit for your user's credits, you want to log into that
	}
	public static function IncreaseCredits($userID, $payout) {
		DB::Execute("UPDATE slotmachine_users SET credits = credits + " . DB::DQ($payout) . " WHERE id = " . DB::DQ($userID) . ";");
		// If you have any sort of audit for your user's credits, you want to log into that
	}
	public static function IncreaseWinnings($userID, $payout) {
		DB::Execute("UPDATE slotmachine_users SET lifetime_winnings = lifetime_winnings + " . DB::DQ($payout) . " WHERE id = " . DB::DQ($userID) . ";");
		// If you have any sort of audit for your user's credits, you want to log into that
		// If you keep track of day_winnings, you probably want to update them here too
	}

	public static function HasEnoughCredits($userID, $bet){
		$userData = self::GetUserData($userID);
		return ($userData['credits'] >= $bet);
	}

}
