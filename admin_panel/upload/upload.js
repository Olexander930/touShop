document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    const labelText = document.getElementById('labelText');
    const resetBtn = document.getElementById('resetBtn');

    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            fileNameDisplay.textContent = 'Вибрано: ' + e.target.files[0].name;
            labelText.textContent = 'Файл готовий';
        }
    });

    resetBtn.addEventListener('click', function() {
        fileNameDisplay.textContent = '';
        labelText.textContent = 'Натисніть для вибору файлу';
    });
});
