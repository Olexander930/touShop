<?php
if (isset($_FILES['image']) && isset($_POST['add'])) {

    $category = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['category']);
    $productId = (int)$_POST['product_id'];
    $fileTmpName = $_FILES['image']['tmp_name'];
    $errorCode = $_FILES['image']['error'];

    if ($errorCode !== UPLOAD_ERR_OK || !is_uploaded_file($fileTmpName)) {
        die("Помилка завантаження файлу");
    }

    $fi = finfo_open(FILEINFO_MIME_TYPE);
    $mime = (string)finfo_file($fi, $fileTmpName);

    if (strpos($mime, 'image') === false) {
        die("Можна завантажувати тільки зображення");
    }

    $limitBytes = 1024 * 1024 * 5;
    if (filesize($fileTmpName) > $limitBytes) {
        die("Файл більше 5 МБ");
    }

    $imageInfo = getimagesize($fileTmpName);
    $extension = image_type_to_extension($imageInfo[2]);
    $format = str_replace('.jpeg', '.jpg', $extension);

    $fileName = $category . '_' . $productId . $format;
    $uploadDir = __DIR__ . '/images/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $destination = $uploadDir . $fileName;

   if (move_uploaded_file($fileTmpName, $destination)) {

    require '../config/db.php';

    $stmt = $pdo->prepare("
        UPDATE goods
        SET image = ?
        WHERE goodsid = ?
    ");

    $stmt->execute([
        $fileName,
        $productId
    ]);
    echo "<div style='font-family: Arial; text-align: center; margin-top: 50px;'>";
    echo "<p>Файл успішно завантажено:</p>";
    echo "<p><b>$fileName</b></p><br>";
    echo "<a href='upload_form.html'
             style='background: #e9008c;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 8px;'>Завантажити ще</a>";
    } else {
        die("Помилка запису файлу");
    }
    require '../config/db.php';

    $stmt = $pdo->prepare("
        UPDATE goods
        SET image = ?
        WHERE goodsid = ?
    ");

    $stmt->execute([
        $fileName,
        $productId
    ]);
} else {
    echo "Некоректний запит";
}
?>