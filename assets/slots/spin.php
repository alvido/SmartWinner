<?php
session_start();
require_once("db.php");
require_once("users.php");
require_once("slotsmachine.php");

$machineName = SlotsMachine::GetMachineName((isset($_POST['machine_name'])? $_POST['machine_name'] : "default" ));

$bet = (isset($_POST['bet']) ? $_POST['bet'] : SlotsMachine::MinBet($machineName)); // Should always be set, but just in case.
$bet = min(max(SlotsMachine::MinBet($machineName), $bet), SlotsMachine::MaxBet($machineName));

$windowID = (isset($_POST['windowID']) ? $_POST['windowID'] : "");

// Validate
$error = "";
$userID = Users::LoggedUserID();

try { DB::BeginTransaction();

	if (!$userID) {
		$error = 'loggedOut';
	} else if(!Users::HasEnoughCredits($userID, $bet)) {
		$error = "You don't have enough credits for this bet";
	}

	if ($error != "") {
		echo json_encode(array('success'=>false, 'error'=>$error));
		return;
	}

	// Do the charging, spinning and crediting
	Users::DeductCredits($userID, $bet);

	Users::IncrementSlotMachineSpins($userID);
	$data = SlotsMachine::Spin($userID, $machineName, $bet, $windowID);

	if ($data['prize'] != null) {
		Users::IncreaseCredits($userID, $data['prize']['payoutCredits']);
		Users::IncreaseWinnings($userID, $data['prize']['payoutWinnings']);
		$data['lastWin'] = $data['prize']['payoutWinnings'];
	}

	$data['success'] = true;

	$userData = Users::GetUserData($userID);
	$data['credits'] = (float) $userData['credits'];
	$data['dayWinnings'] = (float) $userData['day_winnings'];
	$data['lifetimeWinnings'] = (float) $userData['lifetime_winnings'];

	echo json_encode($data);

	DB::Commit();
} catch (Exception $e) { DB::Rollback(); throw $e; }

// Sample responses that allow you to test your CSS and JS
// Comment the entire try/catch block above, and uncomment one of these at a time.

// Regular spin, no prize
//echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => null, 'credits' => 99, 'dayWinnings' => 10, 'lifetimeWinnings' => 500));

// Prize, pays credits only
//echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => array('id' => 1, 'payoutCredits' => 10, 'payoutWinnings' => 0), 'credits' => 19, 'dayWinnings' => 00, 'lifetimeWinnings' => 500));

// Prize, pays winnings only
//echo json_encode(array('success' => true, 'reels' => array(1, 2.5, 3), 'prize' => array('id' => 2, 'payoutCredits' => 0, 'payoutWinnings' => 100), 'credits' => 9, 'dayWinnings' => 100, 'lifetimeWinnings' => 600));

// Error (logged out)
//echo json_encode(array('success' => false, 'error' => 'loggedOut'));

// Error (other)
//echo json_encode(array('success' => false, 'error' => 'You do not have enough credits for this spin'));
