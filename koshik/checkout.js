document.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemsContainer = document.getElementById('checkout-items');
    const totalContainer = document.getElementById('checkoutTotal');

    if (items.length === 0) {
        itemsContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">Кошик порожній</p>';
        totalContainer.innerHTML = 'Разом: <span>0 грн</span>';
        return;
    }

    function getImagePath(image) {
        if (image.startsWith('image_')) {
            return '../Tovar/' + image;
        }
        return '../admin_panel/upload/images/' + image;
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    itemsContainer.innerHTML = items.map(item => `
        <div class="checkout-item">
            <img src="${getImagePath(item.image)}" alt="${item.name}" class="checkout-item-img" onerror="this.src='../Tovar/no-image.png'">
            <div class="checkout-item-info">
                <strong>${item.name}</strong>
                <span>${item.price} грн × ${item.quantity}</span>
            </div>
            <span class="checkout-item-price">${item.price * item.quantity} грн</span>
        </div>
    `).join('');

    totalContainer.innerHTML = 'Разом: <span>' + total + ' грн</span>';
});

function submitCheckout() {
    // Отримуємо елементи форми
    const firstNameInput = document.getElementById('orderFirstName');
    const lastNameInput = document.getElementById('orderLastName');
    const phoneInput = document.getElementById('orderPhone');
    const emailInput = document.getElementById('orderEmail');
    const cityInput = document.getElementById('orderCity');
    const deliveryInput = document.getElementById('orderDelivery');
    const addressInput = document.getElementById('orderAddress');
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim(); 
    const city = cityInput.value.trim();
    const delivery = deliveryInput.value; 
    const address = addressInput.value.trim();

    const items = JSON.parse(localStorage.getItem('cart') || '[]');

    if (items.length === 0) {
        alert('Ваш кошик порожній!');
        window.location.href = '../catalog/catalog.php';
        return;
    }

    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    let hasError = false;

    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;

        inputElement.parentNode.appendChild(errorSpan);
        hasError = true;
    }

    if (!firstName) showError(firstNameInput, "Введіть ваше ім'я");
    if (!lastName) showError(lastNameInput, "Введіть ваше прізвище");

    const phoneDigitsOnly = phone.replace(/\D/g, ''); 
    if (!phone) {
        showError(phoneInput, "Введіть номер телефону");
    } else if (!/^[+]?[0-9\s\-()]+$/.test(phone) || phoneDigitsOnly.length < 10) {
        showError(phoneInput, "Некоректний формат (мінімум 10 цифр)");
    }

    if (!email) {
        showError(emailInput, "Введіть ваш email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(emailInput, "Некоректний формат email (наприклад: name@mail.com)");
    }

    if (!city) showError(cityInput, "Введіть ваше місто");
    if (!delivery) showError(deliveryInput, "Оберіть спосіб доставки");
    
    if (!address) showError(addressInput, "Вкажіть номер відділення або адресу");

    if (hasError) {
        return; 
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    alert(`Ваше замовлення підтверджено! \n\nДякуємо, ${firstName}! Сума до сплати: ${total} грн. Ми зв'яжемося з вами найближчим часом.`);

    localStorage.removeItem('cart');
    window.location.href = '../catalog/catalog.php';
}