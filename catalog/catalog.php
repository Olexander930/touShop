<?php
session_start();
require '../admin_panel/config/db.php'; 

$category_slug = isset($_GET['category']) ? $_GET['category'] : '';
$search_query = isset($_GET['search']) ? trim($_GET['search']) : '';

$category_map = [
    'constructors' => "Конструктор",
    'cars'         => "Машинки",
    'dolls'        => "Ляльки",
    'board_games'  => "Настільні ігри",
    'soft_toys'    => "М'які іграшки",
    'edu'          => "Розвиваючі іграшки",
    'babies'       => "Іграшки для немовлят",
    'school'       => "Товари для школи"
];

$searchName = isset($category_map[$category_slug]) ? $category_map[$category_slug] : '';
if (!empty($search_query)) {
    $stmt = $pdo->prepare("
        SELECT goods.*, categories.catname 
        FROM goods 
        JOIN categories ON goods.catid = categories.catid 
        WHERE goods.namemodel LIKE ?
    ");
    $stmt->execute(['%' . $search_query . '%']);
    $currentCategoryDisplay = "Пошук: «" . htmlspecialchars($search_query) . "»";
}
elseif (!empty($searchName)) {
    $stmt = $pdo->prepare("
        SELECT goods.*, categories.catname 
        FROM goods 
        JOIN categories ON goods.catid = categories.catid 
        WHERE categories.catname = ?
    ");
    $stmt->execute([$searchName]);
    $currentCategoryDisplay = $searchName;
}
else {
    $stmt = $pdo->query("
        SELECT goods.*, categories.catname 
        FROM goods 
        JOIN categories ON goods.catid = categories.catid
    ");
    $currentCategoryDisplay = "Всі товари";
}

$products = $stmt->fetchAll();

include 'catalog_view.php';
?>