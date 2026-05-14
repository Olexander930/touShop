<?php
require '../config/db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['p_name']);
    $catid = (int)$_POST['catid'];
    $price = (float)$_POST['p_price'];
    $image = trim($_POST['image_name']);
    $description = trim($_POST['description']);
    $stmt = $pdo->prepare("
        INSERT INTO goods (
            namemodel,
            catid,
            price,
            image,
            description
        )
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $name,
        $catid,
        $price,
        $image,
        $description
    ]);

    header("Location: ../dashboard/admin_dashboard.php");
    exit;
}
echo "Некоректний запит";
?>