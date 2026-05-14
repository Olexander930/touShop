<?php
require '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $id = (int)$_POST['goodsid'];

    $name = trim($_POST['p_name']);
    $price = (float)$_POST['p_price'];
    $description = trim($_POST['description']);

    $stmt = $pdo->prepare("
        UPDATE goods
        SET namemodel = ?,
            price = ?,
            description = ?
        WHERE goodsid = ?
    ");

    $stmt->execute([
        $name,
        $price,
        $description,
        $id
    ]);
    header("Location: ../dashboard/admin_dashboard.php");
    exit;
}
?>