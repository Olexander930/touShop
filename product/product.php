<?php
session_start();
require '../admin_panel/config/db.php';

$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($product_id > 0) {
    $stmt = $pdo->prepare("
        SELECT goods.*, categories.catname 
        FROM goods 
        JOIN categories ON goods.catid = categories.catid 
        WHERE goods.goodsid = ?
    ");
    $stmt->execute([$product_id]);
    $product = $stmt->fetch();
}

if (!$product) {
    header('Location: ../catalog/catalog.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($product['namemodel']) ?> - Іграшковий магазинчик</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../main/style.css">
    <link rel="stylesheet" href="product.css">
</head>
<body>
    <div class="main_content">
        <div class="top-banner">
            <div class="banner-container">
                <img src="../Tovar/header.jpg" alt="Рекламний банер іграшок">
            </div>
        </div>
        <header class="top-header">
            <div class="header-container">
                <a href="../main/index.html" class="logo">
                    <span>Іграшковий</span> магазинчик
                </a>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Що ви шукаєте?">
                    <button id="searchBtn">Пошук</button>
                </div>
                <div class="header-actions">
                </div>
            </div>
        </header>

        <nav>
            <a href="../catalog/catalog.php" class="catalog-btn">
                <i class="fa-solid fa-bars"></i>
                <span>Каталог</span>
            </a>
            <ul class="nav-menu">
                <li><a href="../brands/brands.html">Бренди</a></li>
                <li><a href="../dostavka/oplata.html">Оплата та доставка</a></li>
                <li><a href="../kontakti/kontakti.html">Контакти</a></li>
            </ul>
        </nav>

        <main class="product-page-wrapper">
            <div class="product-container">
                <div class="product-gallery">
                    <img src="../admin_panel/upload/images/<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['namemodel']) ?>">
                </div>

                <div class="product-info">
                    <h1 class="product-title-big"><?= htmlspecialchars($product['namemodel']) ?></h1>
                    <div class="product-status">В наявності</div>
                    
                    <div class="product-price-big"><?= number_format($product['price'], 0, '', ' ') ?> грн</div>
                    
                    <div class="product-description">
                        <h3>Опис товару:</h3>
                        <p><?= nl2br(htmlspecialchars($product['description'] ?? 'Чудова іграшка для вашої дитини. Висока якість, безпечні матеріали.')) ?></p>
                        <ul>
                            <li><strong>Категорія:</strong> <?= htmlspecialchars($product['catname']) ?></li>
                            <li><strong>Код товару:</strong> #<?= $product['goodsid'] ?></li>
                        </ul>
                    </div>

                    <button class="buy-btn-big" 
                            data-id="<?= $product['goodsid'] ?>" 
                            data-name="<?= htmlspecialchars($product['namemodel']) ?>" 
                            data-price="<?= $product['price'] ?>" 
                            data-image="<?= htmlspecialchars($product['image']) ?>">
                        <i class="fa-solid fa-cart-shopping"></i> Додати до кошика
                    </button>
                </div>
            </div>
        </main>

        <footer>Розробник: Іванченко Олександр студент групи ІТ-31/2</footer>
    </div>
    
    <script src="../main/poshuk.js"></script>
    <script src="../main/check_user.js"></script>
    <script src="../koshik/cart.js"></script>
</body>
</html>