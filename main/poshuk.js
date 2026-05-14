document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const priceSlider = document.getElementById("priceSlider");
    const priceValueDisplay = document.getElementById("priceValueDisplay");
    const products = document.querySelectorAll(".card_image");
    const grid = document.querySelector(".catalog-grid");
    function goToCatalogSearch() {
        const query = searchInput ? searchInput.value.trim() : "";
        if (query) {
            window.location.href = '../catalog/catalog.php?search=' + encodeURIComponent(query);
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", goToCatalogSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                goToCatalogSearch();
            }
        });
    }

    if (grid && products.length > 0) {
        let emptyMsg = document.getElementById("empty-msg");
        if (!emptyMsg) {
            emptyMsg = document.createElement("div");
            emptyMsg.id = "empty-msg";
            emptyMsg.style.cssText = "display:none; text-align:center; width:100%; padding:60px 20px; grid-column: 1/-1;";
            emptyMsg.innerHTML = `
                <i class="fa-solid fa-face-sad-tear" style="font-size:64px; display:block; margin-bottom:20px; color:#ddd;"></i>
                <p style="font-size:18px; color:#999;">На жаль, за вашим запитом нічого не знайдено</p>
            `;
            grid.appendChild(emptyMsg);
        }

        function applyFilters() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
            const maxPrice = priceSlider ? parseInt(priceSlider.value) : 10000;
            let visibleCount = 0;

            if (priceValueDisplay) priceValueDisplay.textContent = maxPrice + " грн";

            products.forEach(product => {
                const title = product.querySelector(".product-title")?.textContent.toLowerCase() || "";
                const priceText = product.querySelector(".product-price")?.textContent || "0";
                const price = parseInt(priceText.replace(/\D/g, ''));

                const matchesSearch = title.includes(query);
                const matchesPrice = price <= maxPrice;

                if (matchesSearch && matchesPrice) {
                    product.style.display = "flex";
                    visibleCount++;
                } else {
                    product.style.display = "none";
                }
            });

            if (emptyMsg) {
                emptyMsg.style.display = (visibleCount === 0) ? "block" : "none";
            }
        }

        if (searchInput) searchInput.addEventListener("input", applyFilters);
        if (priceSlider) priceSlider.addEventListener("input", applyFilters);
    }
});