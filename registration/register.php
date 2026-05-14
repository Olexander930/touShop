<?php
session_start();
require '../admin_panel/config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name = trim($_POST['first_name'] ?? '');
    $last_name = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    $errors = [];

    if (empty($first_name)) {
        $errors[] = "Введіть ім'я";
    }
    if (empty($last_name)) {
        $errors[] = "Введіть прізвище";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Введіть коректний email";
    }
    if (empty($password) || strlen($password) < 6) {
        $errors[] = "Пароль має бути не менше 6 символів";
    }
    if ($password !== $confirm_password) {
        $errors[] = "Паролі не збігаються";
    }

    if (empty($errors)) {
        try {
            $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $checkStmt->execute([$email]);
            if ($checkStmt->fetch()) {
                $errors[] = "Користувач з таким email вже зареєстрований";
            }
        } catch (PDOException $e) {
            $errors[] = "Помилка сервера. Спробуйте пізніше.";
        }
    }

    if (!empty($errors)) {
        $errorString = implode('\n', $errors);
        echo "<script>
            alert('" . addslashes($errorString) . "');
            window.location.href='register.html';
        </script>";
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')");
        $fullName = $first_name . ' ' . $last_name;
        $stmt->execute([$fullName, $email, $hashed_password]);

        echo "<script>
            alert('Реєстрація успішна! Тепер ви можете увійти.');
            window.location.href='../authorization/auth.html';
        </script>";
    } catch (PDOException $e) {
        echo "<script>
            alert('Помилка реєстрації: " . addslashes($e->getMessage()) . "');
            window.location.href='register.html';
        </script>";
    }
} else {
    header('Location: register.html');
    exit;
}
?>