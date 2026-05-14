<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Редагування товару | Адмін-панель</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="edit.css">
</head>
<body>

<div class="form-wrapper">
    <div class="form-container">
        
        <div class="form-header">
            <h1>Редагування товару</h1>
            <a href="../dashboard/admin_dashboard.php" class="btn-back">Скасувати</a>
        </div>

        <form action="update_product.php" method="POST">
            <input type="hidden" name="goodsid" value="<?= $product['goodsid'] ?>">

            <div class="form-group">
                <label for="p_name">Назва товару</label>
                <input type="text" id="p_name" name="p_name" value="<?= htmlspecialchars($product['namemodel']) ?>" required>
            </div>

            <div class="form-group">
                <label for="p_price">Ціна (грн)</label>
                <input type="number" step="0.01" id="p_price" name="p_price" value="<?= $product['price'] ?>" required>
            </div>

            <div class="form-group">
                <label for="description">Опис</label>
                <textarea id="description" name="description" rows="5"><?= htmlspecialchars($product['description']) ?></textarea>
            </div>

            <button type="submit" class="btn-submit">Оновити товар</button>
        </form>

    </div>
</div>

<script src="edit.js"></script>

</body>
</html>