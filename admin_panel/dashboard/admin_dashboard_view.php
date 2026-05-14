<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Адмін-панель | Каталог</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="admin.css">
</head>
<body>
<div class="container">
    <div class="header-actions">
        <h1>Каталог товарів</h1>
        <div class="button-group">
            <a href="../add/add_product.html" class="btn-add">Додати новий товар</a>
            <a href="../upload/upload_form.html" class="btn-photo">Додати фото товару</a>
            <a href="../../main/index.html" class="btn-back">Повернутись на сайт</a>
        </div>
    </div>
    <form action="../delete/delete_selected.php" method="POST">
        <div class="table-wrapper">
            <div class="table-actions">
                <button type="submit"name="delete_selected"class="btn-delete-selected">Видалити вибрані</button>
                <button type="submit" name="delete_all" class="btn-delete-all" onclick="return confirm('Видалити ВСІ товари?')">Видалити всі</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Зображення</th>
                        <th>Назва</th>
                        <th>Категорія</th>
                        <th>Ціна</th>
                        <th>Опис</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($goods as $item): ?>
                    <tr>
                        <td>
                            <input type="checkbox"name="product_ids[]"value="<?= $item['goodsid'] ?>"class="item-checkbox">
                        </td>
                        <td>
                            <strong>#<?= $item['goodsid'] ?></strong>
                        </td>
                        <td>
                            <img src="../upload/images/<?= htmlspecialchars($item['image']) ?>" class="img-thumbnail"alt="Фото товару">
                        </td>
                        <td class="product-name">
                            <?= htmlspecialchars($item['namemodel']) ?>
                        </td>
                        <td>
                            <span class="badge-category">
                                <?= htmlspecialchars($item['catname']) ?>
                            </span>
                        </td>
                        <td class="price">
                            <?= number_format($item['price'], 2, '.', ' ') ?> грн
                        </td>
                        <td class="desc-text">
                            <?= htmlspecialchars($item['description']) ?>
                        </td>
                        <td>
                            <div class="actions">
                                <a class="btn-action edit-btn" href="../edit/edit_product.php?id=<?= $item['goodsid'] ?>">Редагувати</a>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </form>
</div>
<script src="admin.js"></script>
</body>
</html>