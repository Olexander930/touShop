window.authPromise = fetch('../authorization/check_auth.php')
    .then(res => res.json())
    .catch(() => ({ loggedIn: false, role: 'guest' }));

document.addEventListener("DOMContentLoaded", function() {
    window.authPromise.then(data => {
        const headerActions = document.querySelector('.header-actions');

        if (!headerActions) {
            console.log('.header-actions не знайдено на сторінці');
            return;
        }

        console.log('Авторизація:', data);

        let html = '';
        if (data.loggedIn && data.role === 'admin') {
            html += `
                <a href="../admin_panel/dashboard/admin_dashboard.php" class="action-item">
                    <div class="icon-wrap"><i class="fa-solid fa-gear"></i></div>
                    <span>Адмінка</span>
                </a>`;
        }
        html += `
            <a href="../koshik/cart.html" class="action-item">
                <div class="icon-wrap">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="badge" id="cartBadge" style="display: none;">0</span>
                </div>
                <span>Кошик</span>
            </a>`;
        if (data.loggedIn) {
            html += `
            <a href="../logout/logout.php" class="action-item">
                <div class="icon-wrap"><i class="fa-solid fa-right-from-bracket"></i></div>
                <span>Вихід</span>
            </a>`;
        } else {
            html += `
            <a href="../authorization/auth.html" class="action-item">
                <div class="icon-wrap"><i class="fa-regular fa-user"></i></div>
                <span>Вхід</span>
            </a>`;
        }

        headerActions.innerHTML = html;

        if (window.cart) {
            window.cart.updateBadge();
        }
        if (!data.loggedIn) {
            document.addEventListener('click', function(e) {
                if (e.target.closest('.buy-btn') || e.target.closest('.buy-btn-big')) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    alert("Будь ласка, увійдіть або зареєструйтесь!");
                    window.location.href = "../authorization/auth.html";
                }
            }, true);

            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('focus', function(e) {
                    e.target.blur();
                    alert("Будь ласка, увійдіть або зареєструйтесь!");
                    window.location.href = "../authorization/auth.html";
                });
            }
        }
    });
});