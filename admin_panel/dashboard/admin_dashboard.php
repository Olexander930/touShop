<?php
session_start();

if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../../authorization/auth.html");
    exit;
}

require '../config/db.php';

$stmt = $pdo->query("SELECT goods.*, categories.catname FROM goods JOIN categories ON goods.catid = categories.catid ORDER BY goodsid DESC");
$goods = $stmt->fetchAll();

include 'admin_dashboard_view.php';
?>
