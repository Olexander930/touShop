<?php
require '../config/db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id === 0) {
    die("Невірний ID товару.");
}

$stmt = $pdo->prepare("SELECT * FROM goods WHERE goodsid = ?");
$stmt->execute([$id]);
$product = $stmt->fetch();

if (!$product) {
    die("Товар не знайдено.");
}

require 'edit_product_view.php';
?>