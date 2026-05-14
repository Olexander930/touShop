<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Каталог - <?= htmlspecialchars($currentCategoryDisplay) ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="catalog.css">
    <link rel="stylesheet" href="../main/style.css"> 
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
                <a href="../main/index.html" class="logo"> <span>Іграшковий</span> магазинчик
                </a>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Що ви шукаєте?" value="<?= htmlspecialchars($search_query ?? '') ?>">
                    <button id="searchBtn">Пошук</button>
                </div>
                <div class="header-actions">
                </div>
            </div>
        </header>
        
        <nav class="catalog-nav">
            <a href="catalog.php" class="catalog-nav-btn">
                <i class="fa-solid fa-bars"></i>
                <span>Каталог</span>
            </a>
            <ul class="catalog-nav-menu">
                <li><a href="../brands/brands.html">Бренди</a></li>
                <li><a href="../dostavka/oplata.html">Оплата та доставка</a></li>
                <li><a href="../kontakti/kontakti.html">Контакти</a></li>
            </ul>
        </nav>
        
        <main class="content-wrapper">
            <aside class="sidebar">
                <div class="sidebar-block">
                    <h3 class="sidebar-title">Категорії</h3>
                    <ul class="category-menu-list">
                        <li>
                            <a href="catalog.php" class="category-link <?= (!isset($_GET['category']) && !isset($_GET['search'])) ? 'active' : '' ?>">
                                <i class="fa-solid fa-layer-group"></i> Всі товари
                            </a>
                        </li>
                        <?php
                        $categories = [
                            'constructors' => ['name' => "Конструктори", 'icon' => 'fa-cubes'],
                            'cars'         => ['name' => "Машинки", 'icon' => 'fa-car'],
                            'dolls'        => ['name' => "Ляльки", 'icon' => 'fa-person-dress'],
                            'board_games'  => ['name' => "Настільні ігри", 'icon' => 'fa-chess-board'],
                            'soft_toys'    => ['name' => "М'які іграшки", 'icon' => 'fa-paw'],
                            'edu'          => ['name' => "Розвиваючі іграшки", 'icon' => 'fa-lightbulb'],
                            'babies'       => ['name' => "Для немовлят", 'icon' => 'fa-baby'],
                            'school'       => ['name' => "Товари для школи", 'icon' => 'fa-graduation-cap']
                        ];

                        foreach ($categories as $slug => $data):
                            $activeClass = (isset($_GET['category']) && $_GET['category'] == $slug) ? 'active' : '';
                        ?>
                        <li>
                            <a href="catalog.php?category=<?= $slug ?>" class="category-link <?= $activeClass ?>">
                                <i class="fa-solid <?= $data['icon'] ?>"></i> <?= $data['name'] ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div class="sidebar-block">
                    <h3 class="sidebar-title">Ціна (грн)</h3>
                    <div class="price-box">
                        <input type="range" min="0" max="3000" value="3000" class="price-slider" id="priceSlider">
                        <div class="price-values">
                            <span class="min-p">0 грн</span>
                            <span id="priceValueDisplay" class="max-p">3000 грн</span>
                        </div>
                    </div>
                </div>
            </aside>

            <section class="products-section">
                <h2><?= htmlspecialchars($currentCategoryDisplay) ?></h2>
                
                <?php if (empty($products)): ?>
                    <div class="no-products">
                        <i class="fa-solid fa-search no-products-icon"></i>
                        <p>На жаль, за вашим запитом нічого не знайдено</p>
                    </div>
                <?php else: ?>
                    <div class="catalog-grid">
                        <?php foreach ($products as $product): ?>
                            <div class="card_image">
                                <a href="../product/product.php?id=<?= $product['goodsid'] ?>" style="text-decoration: none; color: inherit; display: contents;">
                                    <img src="../admin_panel/upload/images/<?= htmlspecialchars($product['image']) ?>" alt="Товар">
                                    <p class="product-title"><?= htmlspecialchars($product['namemodel']) ?></p>
                                </a>
                                <p class="product-price"><?= number_format($product['price'], 0, '', ' ') ?> грн</p>
                                <button class="buy-btn" data-id="<?= $product['goodsid'] ?>" data-name="<?= htmlspecialchars($product['namemodel']) ?>" data-price="<?= $product['price'] ?>" data-image="<?= htmlspecialchars($product['image']) ?>">В кошик</button>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </section>
        </main>
        <footer>Розробник: Іванченко Олександр</footer>
    </div>

    <script src="../main/poshuk.js"></script>
    <script src="../main/check_user.js"></script>
    <script src="../koshik/cart.js"></script>
    <script src="catalog.js"></script>
</body>
</html>