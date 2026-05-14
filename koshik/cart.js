class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart') || '[]');
        this.init();
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateBadge();
        this.render();
    }

    add(product) {
        const existing = this.items.find(item => item.id == product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: parseInt(product.price),
                image: product.image,
                quantity: 1
            });
        }
        this.save();
    }

    remove(index) {
        this.items.splice(index, 1);
        this.save();
    }

    changeQuantity(index, delta) {
        this.items[index].quantity += delta;
        if (this.items[index].quantity <= 0) {
            this.remove(index);
        } else {
            this.save();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateBadge() {
        const count = this.getCount();
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    getImagePath(image) {
        if (image.startsWith('image_')) {
            return '../Tovar/' + image;
        }
        return '../admin_panel/upload/images/' + image;
    }

    render() {
        const container = document.getElementById('basket-content');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-cart-shopping cart-empty-icon"></i>
                    <p>Кошик порожній</p>
                </div>`;
            return;
        }

        const itemsHTML = this.items.map((item, index) => `
            <div class="basket-item">
                <img src="${this.getImagePath(item.image)}" 
                     alt="${item.name}" 
                     class="basket-item-img"
                     onerror="this.src='../Tovar/no-image.png'">
                <div class="basket-item-info">
                    <strong>${item.name}</strong>
                    <span>${item.price} грн × ${item.quantity} = ${item.price * item.quantity} грн</span>
                </div>
                <div class="basket-item-actions">
                    <button class="btn-qty" onclick="cart.changeQuantity(${index}, -1)">−</button>
                    <span class="basket-item-qty">${item.quantity}</span>
                    <button class="btn-qty" onclick="cart.changeQuantity(${index}, 1)">+</button>
                    <button class="btn-remove" onclick="cart.remove(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="basket-items-list">
                ${itemsHTML}
            </div>
            <div class="basket-total">
                Разом: <span>${this.getTotal()} грн</span>
            </div>
            <button class="btn-checkout" onclick="window.location.href='checkout.html'">
                Оформити замовлення
            </button>
        `;
    }

    clear() {
        this.items = [];
        this.save();
    }

    init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.buy-btn') || e.target.closest('.buy-btn-big');
            if (!btn) return;

            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            const image = btn.dataset.image;

            if (!id || !name || !price) return;

            this.add({ id, name, price, image });

            const originalText = btn.textContent;
            btn.textContent = 'Додано!';
            btn.style.background = '#27ae60';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1200);
        });

        this.updateBadge();
        this.render();
    }
}

const cart = new Cart();
window.cart = cart;