<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_role'])) {
    echo json_encode([
        'loggedIn' => true,
        'role' => $_SESSION['user_role'],
        'name' => $_SESSION['logged_user']
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
exit;
?>