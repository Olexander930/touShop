<?php
require '../config/db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['delete_all'])) {
        $pdo->query("TRUNCATE TABLE goods RESTART IDENTITY");
        header("Location: ../dashboard/admin_dashboard.php");
        exit;
    }

    if (isset($_POST['delete_selected']) && !empty($_POST['product_ids'])) {
        $ids = $_POST['product_ids'];
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $sql = "DELETE FROM goods WHERE goodsid IN ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($ids);
        header("Location: ../dashboard/admin_dashboard.php");
        exit;
    }

}
echo "Нічого не вибрано";