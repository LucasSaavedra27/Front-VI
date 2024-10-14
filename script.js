const products = [
    { id: 1, name: 'Monitor Led Samsung 24"', description: 'Ips 75hz azul grisáceo oscuro', price: 269999, image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Monitors', brand: 'Samsung' },
    { id: 2, name: 'Monitor Hkc Antteg 23.8 Full Hd', description: 'F238m 24 Ips 75 Hz Hdmi Color Negro', price: 220117, image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Monitors', brand: 'HKC' },
    { id: 3, name: 'Monitor LG 24ms500-b Fhd', description: 'Ips 1920x1080 100hz 1ms Hdmi X2 Color Negro', price: 204998, image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Monitors', brand: 'LG' },
    { id: 4, name: 'Laptop Dell XPS 13', description: 'Intel Core i7, 16GB RAM, 512GB SSD', price: 1299999, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Laptops', brand: 'Dell' },
    { id: 5, name: 'iPhone 13 Pro', description: '256GB, Graphite', price: 999999, image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Smartphones', brand: 'Apple' },
    { id: 6, name: 'Sony WH-1000XM4 Headphones', description: 'Wireless Noise-Cancelling', price: 349999, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Audio', brand: 'Sony' },
    { id: 7, name: 'LG Smart Refrigerator', description: 'InstaView Door-in-Door, 26 cu. ft.', price: 2499999, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Appliances', brand: 'LG' },
    { id: 8, name: 'Samsung QLED 4K TV', description: '65" Smart TV with Quantum HDR', price: 1799999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'TVs', brand: 'Samsung' },
    { id: 9, name: 'Google Pixel 6', description: '128GB, Stormy Black', price: 699999, image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae3252?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Smartphones', brand: 'Google' },
    { id: 10, name: 'MacBook Pro 16"', description: 'M1 Pro, 16GB RAM, 512GB SSD', price: 2499999, image: 'https://images.unsplash.com/photo-1617499615664-1636f1e9d0c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Laptops', brand: 'Apple' },
];

let cart = [];
let favorites = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('homeLink');
    const productsLink = document.getElementById('productsLink');
    const homePage = document.getElementById('homePage');
    const productsPage = document.getElementById('productsPage');
    const featuredProducts = document.getElementById('featuredProducts');
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const cartBtn = document.getElementById('cartBtn');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const signInBtn = document.getElementById('signInBtn');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const favoritesModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const showRegisterModal = document.getElementById('showRegisterModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    homeLink.addEventListener('click', showHomePage);
    productsLink.addEventListener('click', showProductsPage);
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    brandFilter.addEventListener('change', filterProducts);
    minPrice.addEventListener('input', filterProducts);
    maxPrice.addEventListener('input', filterProducts);
    cartBtn.addEventListener('click', () => cartModal.show());
    favoritesBtn.addEventListener('click', () => favoritesModal.show());
    showRegisterModal.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.hide();
        registerModal.show();
    });

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    initializeFilters();
    showHomePage();
    updateCartBadge();
    updateFavoritesBadge();

    function showHomePage() {
        homePage.classList.remove('d-none');
        productsPage.classList.add('d-none');
        renderFeaturedProducts();
    }

    function showProductsPage() {
        homePage.classList.add('d-none');
        productsPage.classList.remove('d-none');
        renderProducts();
    }

    function renderFeaturedProducts() {
        featuredProducts.innerHTML = products.slice(0, 6).map(product => createProductCard(product)).join('');
    }

    function renderProducts() {
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    }

    function createProductCard(product) {
        const isInCart = cart.some(item => item.id === product.id);
        const isFavorite = favorites.some(item => item.id === product.id);
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                        <i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">$${product.price.toLocaleString('es-AR')}</span>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})" ${isInCart ? 'disabled' : ''}>
                                ${isInCart ? 'En carrito' : 'Agregar al carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function initializeFilters() {
        const categories = [...new Set(products.map(p => p.category))];
        const brands = [...new Set(products.map(p => p.brand))];

        categoryFilter.innerHTML += categories.map(category => `<option value="${category}">${category}</option>`).join('');
        brandFilter.innerHTML += brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const brand = brandFilter.value;
        const min = parseFloat(minPrice.value) || 0;
        const max = parseFloat(maxPrice.value) || Infinity;

        const filtered = products.filter(product => 
            (product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)) &&
            (category === '' || product.category === category) &&
            (brand === '' || product.brand === brand) &&
            (product.price >= min && product.price <= max)
        );

        productGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!currentUser) {
        alert('Por favor, inicia sesión para agregar al carrito.');
        return;
    }
    if (product && !cart.some(item => item.id === productId)) {
        cart.push(product);
        updateCartBadge();
        renderCart();
        updateProductCard(productId);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();
    updateProductCard(productId);
}

function toggleFavorite(productId) {
    if (!currentUser) {
        alert('Por favor, inicia sesión para agregar favoritos.');
        return;
    }

    const index = favorites.findIndex(item => item.id === productId);
    if (index === -1) {
        favorites.push(products.find(p => p.id === productId));
    } else {
        favorites.splice(index, 1);
    }
    updateFavoritesBadge();
    renderFavorites();
    updateProductCard(productId);
}

function updateProductCard(productId) {
    const productCards = document.querySelectorAll(`.card`);
    productCards.forEach(card => {
        const cardProductId = parseInt(card.querySelector('button[onclick^="addToCart"]').getAttribute('onclick').match(/\d+/)[0]);
        if (cardProductId === productId) {
            const favoriteBtn = card.querySelector('.favorite-btn');
            const addToCartBtn = card.querySelector('button[onclick^="addToCart"]');
            const isInCart = cart.some(item => item.id === productId);
            const isFavorite = favorites.some(item => item.id === productId);

            favoriteBtn.classList.toggle('active', isFavorite);
            favoriteBtn.innerHTML = `<i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>`;

            addToCartBtn.disabled = isInCart;
            addToCartBtn.textContent = isInCart ? 'En carrito' : 'Agregar al carrito';
        }
    });
}

function updateCartBadge() {
    document.getElementById('cartBadge').textContent = cart.length;
}

function updateFavoritesBadge() {
    document.getElementById('favoritesBadge').textContent = favorites.length;
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="mb-0">$${item.price.toLocaleString('es-AR')}</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toLocaleString('es-AR');
    }
}

function renderFavorites() {
    const favoriteItems = document.getElementById('favoriteItems');
    
    if (favorites.length === 0) {
        favoriteItems.innerHTML = '<p>Aún no has agregado ningún favorito.</p>';
    } else {
        favoriteItems.innerHTML = favorites.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <p class="mb-0">$${item.price.toLocaleString('es-AR')}</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-danger" onclick="toggleFavorite(${item.id})">Eliminar</button>
            </div>
        `).join('');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    //   Aquí normalmente enviarías una solicitud al servidor para validar las credenciales
    // Para este ejemplo, solo verificaremos si el email y la contraseña no están vacíos
    if (email && password) {
        currentUser = { email: email };
        document.getElementById('signInBtn').textContent = 'Cerrar sesión';
        document.getElementById('signInBtn').onclick = handleLogout;
        alert('¡Sesión iniciada con éxito!');
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    } else {
        alert('Email o contraseña inválidos');
    }
}

function handleLogout() {
    currentUser = null;
    favorites = [];
    document.getElementById('signInBtn').textContent = 'Iniciar sesión';
    document.getElementById('signInBtn').onclick = () => bootstrap.Modal.getInstance(document.getElementById('loginModal')).show();
    updateFavoritesBadge();
    alert('¡Sesión cerrada con éxito!');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const birthdate = document.getElementById('registerBirthdate').value;

    // Aquí normalmente enviarías estos datos al servidor para crear un nuevo usuario
    // Para este ejemplo, solo verificaremos si todos los campos están llenos
    if (name && lastName && email && password && birthdate) {
        alert('¡Registro exitoso! Por favor, inicia sesión.');
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).show();
    } else {
        alert('Por favor, completa todos los campos');
    }
}