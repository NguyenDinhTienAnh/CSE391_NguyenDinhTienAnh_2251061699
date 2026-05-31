// ==================== PRODUCT CATALOG APP ====================

// Product data
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 29990000, category: "phone", image: "https://placehold.co/200x200/667eea/ffffff?text=iPhone+16", rating: 4.8, inStock: true, description: "Latest flagship iPhone with advanced camera system" },
    { id: 2, name: "Samsung Galaxy S24", price: 24990000, category: "phone", image: "https://placehold.co/200x200/667eea/ffffff?text=Galaxy+S24", rating: 4.6, inStock: true, description: "Powerful Android flagship with beautiful display" },
    { id: 3, name: "Google Pixel 9 Pro", price: 22990000, category: "phone", image: "https://placehold.co/200x200/667eea/ffffff?text=Pixel+9", rating: 4.5, inStock: true, description: "Google's flagship with exceptional AI features" },
    { id: 4, name: "OnePlus 13", price: 19990000, category: "phone", image: "https://placehold.co/200x200/667eea/ffffff?text=OnePlus+13", rating: 4.4, inStock: true, description: "Fast and smooth Android experience" },

    { id: 5, name: "iPad Pro 12.9", price: 32990000, category: "tablet", image: "https://placehold.co/200x200/764ba2/ffffff?text=iPad+Pro", rating: 4.7, inStock: true, description: "Premium tablet for professionals and creators" },
    { id: 6, name: "Samsung Tab S10 Ultra", price: 28990000, category: "tablet", image: "https://placehold.co/200x200/764ba2/ffffff?text=Tab+S10", rating: 4.5, inStock: true, description: "Large display Android tablet with stylus" },
    { id: 7, name: "iPad Air 11", price: 23990000, category: "tablet", image: "https://placehold.co/200x200/764ba2/ffffff?text=iPad+Air", rating: 4.4, inStock: true, description: "Great balance of performance and price" },
    { id: 8, name: "Lenovo Tab M11", price: 8990000, category: "tablet", image: "https://placehold.co/200x200/764ba2/ffffff?text=Lenovo+Tab", rating: 4.1, inStock: false, description: "Budget-friendly Android tablet" },

    { id: 9, name: "MacBook Pro 16\" M4", price: 69990000, category: "laptop", image: "https://placehold.co/200x200/ff6b6b/ffffff?text=MacBook+Pro", rating: 4.9, inStock: true, description: "Powerful laptop for professionals" },
    { id: 10, name: "Dell XPS 15", price: 52990000, category: "laptop", image: "https://placehold.co/200x200/ff6b6b/ffffff?text=Dell+XPS", rating: 4.7, inStock: true, description: "Excellent Windows ultrabook with great display" },
    { id: 11, name: "Lenovo ThinkPad X1", price: 39990000, category: "laptop", image: "https://placehold.co/200x200/ff6b6b/ffffff?text=ThinkPad", rating: 4.5, inStock: true, description: "Business laptop with reliability" },
    { id: 12, name: "ASUS VivoBook 15", price: 24990000, category: "laptop", image: "https://placehold.co/200x200/ff6b6b/ffffff?text=VivoBook", rating: 4.2, inStock: true, description: "Affordable laptop for everyday tasks" },

    { id: 13, name: "AirPods Pro 3", price: 6990000, category: "accessory", image: "https://placehold.co/200x200/4caf50/ffffff?text=AirPods", rating: 4.6, inStock: true, description: "Premium wireless earbuds with noise cancellation" },
    { id: 14, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/200x200/4caf50/ffffff?text=Sony+XM5", rating: 4.8, inStock: true, description: "Best-in-class noise cancelling headphones" },
    { id: 15, name: "Samsung Galaxy Watch7", price: 8990000, category: "accessory", image: "https://placehold.co/200x200/4caf50/ffffff?text=Galaxy+Watch", rating: 4.4, inStock: true, description: "Android smartwatch with health monitoring" },
    { id: 16, name: "Apple Watch Ultra 2", price: 12990000, category: "accessory", image: "https://placehold.co/200x200/4caf50/ffffff?text=Watch+Ultra", rating: 4.7, inStock: true, description: "Rugged smartwatch for active users" },
];

// State
let filteredProducts = [...products];
let cartCount = 0;
let selectedProduct = null;
let currentFilter = 'all';
let currentSort = 'default';

// DOM Elements
const searchInput = document.querySelector('#searchInput');
const categoryFilter = document.querySelector('#categoryFilter');
const sortSelect = document.querySelector('#sortSelect');
const productGrid = document.querySelector('#productGrid');
const emptyState = document.querySelector('#emptyState');
const productCount = document.querySelector('#productCount');
const productsTitle = document.querySelector('#productsTitle');
const cartBadge = document.querySelector('#cartBadge');
const darkModeBtn = document.querySelector('#darkModeBtn');
const modal = document.querySelector('#productModal');
const modalClose = document.querySelector('.modal-close');
const addToCartBtn = document.querySelector('#addToCartBtn');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeCategoryFilter();
    attachEventListeners();
    render();
    loadDarkMode();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    // Sort
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortProducts();
    });

    // Dark mode
    darkModeBtn.addEventListener('click', toggleDarkMode);

    // Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    addToCartBtn.addEventListener('click', addToCart);

    // Product grid - Event delegation
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            const id = parseInt(card.dataset.id);
            openProductModal(id);
        }
    });

    // Keyboard - Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ==================== CATEGORY FILTER INITIALIZATION ====================
function initializeCategoryFilter() {
    const categories = ['all', ...new Set(products.map(p => p.category))];
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${cat === 'all' ? 'active' : ''}`;
        btn.dataset.category = cat;
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);

        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = cat;
            searchProducts('');
        });

        categoryFilter.appendChild(btn);
    });
}

// ==================== SEARCH & FILTER ====================
function searchProducts(query) {
    const searchTerm = query.toLowerCase();

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.category.toLowerCase().includes(searchTerm);
        const matchesCategory = currentFilter === 'all' || product.category === currentFilter;

        return matchesSearch && matchesCategory;
    });

    // Update title
    if (searchTerm) {
        productsTitle.textContent = `Search: "${query}"`;
    } else {
        const categoryName = currentFilter === 'all' ? 'All Products' : 
                           currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
        productsTitle.textContent = categoryName;
    }

    sortProducts();
}

// ==================== SORT ====================
function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }

    render();
}

// ==================== RENDERING ====================
function render() {
    productGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        emptyState.classList.add('show');
        productCount.textContent = '0 results';
        return;
    }

    emptyState.classList.remove('show');
    productCount.textContent = `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`;

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    const stockStatus = product.inStock ? 'In Stock' : 'Out of Stock';
    const badgeClass = product.inStock ? '' : 'out-of-stock';

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-badge ${badgeClass}">${stockStatus}</span>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <span class="rating-stars">★★★★★</span>
                <span class="rating-value">${product.rating}</span>
            </div>
            <p class="product-price">${formatPrice(product.price)}</p>
            <button class="add-cart-btn" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;

    return card;
}

// ==================== MODAL ====================
function openProductModal(id) {
    selectedProduct = products.find(p => p.id === id);
    if (!selectedProduct) return;

    document.querySelector('#modalImage').src = selectedProduct.image;
    document.querySelector('#modalImage').alt = selectedProduct.name;
    document.querySelector('#modalTitle').textContent = selectedProduct.name;
    document.querySelector('#modalCategory').textContent = selectedProduct.category.toUpperCase();
    document.querySelector('#modalRating').textContent = `⭐ ${selectedProduct.rating}`;
    document.querySelector('#modalStock').textContent = selectedProduct.inStock ? '✓ In Stock' : '✗ Out of Stock';
    document.querySelector('#modalStock').classList.toggle('out', !selectedProduct.inStock);
    document.querySelector('#modalDescription').textContent = selectedProduct.description;
    document.querySelector('#modalPrice').textContent = formatPrice(selectedProduct.price);
    
    addToCartBtn.disabled = !selectedProduct.inStock;
    addToCartBtn.textContent = selectedProduct.inStock ? '🛒 Add to Cart' : 'Out of Stock';

    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
    selectedProduct = null;
}

// ==================== CART ====================
function addToCart() {
    if (!selectedProduct || !selectedProduct.inStock) return;

    cartCount++;
    updateCartBadge();
    closeModal();

    // Show success animation
    showCartNotification();
}

function updateCartBadge() {
    cartBadge.textContent = cartCount;
    cartBadge.classList.add('show');
}

function showCartNotification() {
    // Simple notification (can be enhanced)
    alert(`✅ ${selectedProduct.name} added to cart!`);
}

// ==================== DARK MODE ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
}

function loadDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️';
    }
}

// ==================== UTILITIES ====================
function formatPrice(price) {
    return '₫' + price.toLocaleString('vi-VN');
}
