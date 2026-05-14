function ShowBrandTab(number) {
    const contentBox = document.getElementById("tab_content_box");
    let content = "";

    switch (number) {
        case 1:
            content = `
                <div class="brand-content">
                    <img src="../Tovar/lego_pic.jpg" alt="LEGO">
                    <div>
                        <h3>LEGO - Будуй свої мрії!</h3>
                        <p><strong>LEGO</strong> — найвідоміший у світі виробник конструкторів.</p>
                    </div>
                </div>`;
            break;

        case 2:
            content = `
                <div class="brand-content">
                    <img src="../Tovar/hot_wills_pic.jpg" alt="Hot Wheels">
                    <div>
                        <h3>Hot Wheels - Швидкість та драйв!</h3>
                        <p><strong>Hot Wheels</strong> — іграшкові машинки для дітей і колекціонерів.</p>
                    </div>
                </div>`;
            break;

        case 3:
            content = `
                <div class="brand-content">
                    <img src="../Tovar/barbie_pic.jpg" alt="Barbie">
                    <div>
                        <h3>Barbie - Втілення мрій!</h3>
                        <p><strong>Barbie</strong> — культова лялька для творчої гри.</p>
                    </div>
                </div>`;
            break;

        case 4:
            content = `
                <div class="brand-content">
                    <img src="../Tovar/fisher_pic.jpg" alt="Fisher Price">
                    <div>
                        <h3>Fisher-Price</h3>
                        <p>Розвиваючі іграшки для найменших дітей.</p>
                    </div>
                </div>`;
            break;

        case 5:
            content = `
                <div class="brand-content">
                    <img src="../Tovar/funko_pic.jpg" alt="Funko">
                    <div>
                        <h3>Funko</h3>
                        <p>Колекційні фігурки з фільмів, ігор та серіалів.</p>
                    </div>
                </div>`;
            break;
    }

    contentBox.innerHTML = content;

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[number - 1].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    ShowBrandTab(1);
});