document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".card_image");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const priceSlider = document.getElementById("priceSlider");
    const priceValue = document.getElementById("priceValue");
    const offerCheckboxes = document.querySelectorAll('.special-offer');

    function applyFilters() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const maxPrice = priceSlider ? parseInt(priceSlider.value) : 5000;
        
        if (priceValue) priceValue.textContent = maxPrice + " грн";

        const activeOffers = Array.from(offerCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.id);

        products.forEach(product => {
            const title = product.querySelector(".product-title")?.textContent.toLowerCase() || "";
            const productOffer = product.getAttribute('data-offer');
            const priceText = product.querySelector(".product-price")?.textContent || "0";
            const productPrice = parseInt(priceText.replace(/\D/g, ''));

            const matchSearch = title.includes(query);
            const matchPrice = productPrice <= maxPrice;
            const matchOffer = activeOffers.length === 0 || (productOffer && activeOffers.includes(productOffer));

            if (matchSearch && matchPrice && matchOffer) {
                product.style.display = "flex";
            } else {
                product.style.display = "none";
            }
        });
    }

    if (searchBtn) searchBtn.addEventListener("click", applyFilters);
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (priceSlider) priceSlider.addEventListener("input", applyFilters);
    offerCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
});