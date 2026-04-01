document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Toggle logic for Dark Mode and RTL
    const themeBtn = document.getElementById('theme-toggle');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    const rtlBtn = document.getElementById('rtl-toggle');
    const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');

    // Initialize from LocalStorage
    initTheme();
    initRtl();
    updateCartCount();

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);
    
    if (rtlBtn) rtlBtn.addEventListener('click', toggleRtl);
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRtl);

    // FAQ Accordion Toggle
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Add to Cart Button Logic (Home Page & Detail Page)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: Date.now().toString(),
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price.replace('$', '')),
                image: btn.dataset.image,
                quantity: 1
            };
            
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            updateCartCount();
            window.location.href = 'cart.html';
        });
    });

    // Buy Now Button Logic (Shop Page)
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');
    buyNowButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: btn.dataset.id || '1',
                name: btn.dataset.name,
                price: btn.dataset.price,
                image: btn.dataset.image
            };
            
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            
            // Redirect to service-details.html
            window.location.href = 'service-details.html';
        });
    });

    // Render Cart if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = cartItems.length;
    
    // Update all cart links (desktop icon and mobile text link)
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');
    cartLinks.forEach(link => {
        // If it's the mobile nav link (has "Cart" text)
        if (link.classList.contains('nav-link') && (link.innerText.toUpperCase().includes('CART') || link.id === 'cart-link-mobile')) {
            link.innerHTML = `<i class="fas fa-shopping-cart" style="margin-right: 15px;"></i> CART (${count})`;
        }
    });
}

function initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function updateThemeIcon(isDark) {
    const themeBtn = document.getElementById('theme-toggle');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');

    if (themeBtn) {
        themeBtn.innerHTML = isDark ? '☀️' : '🌙';
    }
    
    if (mobileThemeBtn) {
        mobileThemeBtn.innerHTML = isDark ? '<i class="fas fa-sun" style="margin-right: 15px;"></i> LIGHT MODE' : '<i class="fas fa-moon" style="margin-right: 15px;"></i> DARK MODE';
    }
}

function toggleTheme(e) {
    if (e) e.preventDefault();
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon(isDark);
}

function initRtl() {
    const isRtl = localStorage.getItem('rtlMode') === 'true';
    if (isRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
    }
}

function toggleRtl(e) {
    if (e) e.preventDefault();
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('rtlMode', newDir === 'rtl');
}

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTableBody = document.querySelector('.cart-table tbody');
    
    if (!cartTableBody) return;

    if (cartItems.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 50px;">Your cart is empty. <a href="services.html" style="color: var(--secondary-color); text-decoration: underline;">Shop now</a></td></tr>';
        updateSummary(0);
        return;
    }

    cartTableBody.innerHTML = '';
    let totalSubtotal = 0;

    cartItems.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        totalSubtotal += itemSubtotal;

        const row = document.createElement('tr');
        row.className = 'cart-item';
        row.innerHTML = `
            <td data-label="Product">
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-product-info">
                        <h3>${item.name}</h3>
                        <p>Premium Vintage Selection</p>
                    </div>
                </div>
            </td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Quantity">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <input type="text" value="${item.quantity}" class="quantity-input" readonly>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            </td>
            <td data-label="Subtotal">$${itemSubtotal.toFixed(2)}</td>
            <td>
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    updateSummary(totalSubtotal);
    setupCartListeners();
}

function updateSummary(subtotal) {
    const summaryCard = document.querySelector('.summary-card');
    if (!summaryCard) return;

    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const summaryRows = summaryCard.querySelectorAll('.summary-row');
    if (summaryRows.length >= 4) {
        summaryRows[0].querySelector('span:last-child').innerText = `$${subtotal.toFixed(2)}`;
        summaryRows[1].querySelector('span:last-child').innerText = subtotal > 0 ? 'FREE' : '$0.00';
        summaryRows[2].querySelector('span:last-child').innerText = `$${tax.toFixed(2)}`;
        summaryRows[3].querySelector('span:last-child').innerText = `$${total.toFixed(2)}`;
    }
}

function setupCartListeners() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems[index].quantity++;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            }
        });
    });
}
