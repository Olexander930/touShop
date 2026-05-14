<?php
session_start();
require '../admin_panel/config/db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['logged_user'] = $user['name'];
        $_SESSION['user_role'] = $user['role']; 

        header("Location: ../main/index.html");
        exit;
    } else {
        echo "<script>alert('Невірний логін або пароль!'); window.location.href='auth.html';</script>";
        exit;
    }
}
?>