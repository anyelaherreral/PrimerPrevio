document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const logoutBtn = document.getElementById('logoutBtn');
    const cartBtn = document.getElementById('cartBtn'); // Botón de carrito


    let allProducts = [];

    // Función para crear una card de producto
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn">Añadir al carrito</button>
        `;
        return card;
    }

    // Función para mostrar productos
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = createProductCard(product);
            productList.appendChild(card);
        });
    }

    // Cargar todos los productos al inicio
    function loadAllProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(products => {
                allProducts = products;
                displayProducts(products);
                console.log('Productos cargados:', products);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
                productList.innerHTML = '<p>Error al cargar los productos. Por favor, intente de nuevo más tarde.</p>';
            });
    }

    // Filtrar por categoría
    function setupCategoryFilters() {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                fetch(`https://fakestoreapi.com/products/category/${category}`)
                    .then(res => res.json())
                    .then(products => {
                        displayProducts(products);
                        console.log('Productos filtrados por categoría:', products);
                    })
                    .catch(error => {
                        console.error('Error al filtrar productos:', error);
                        productList.innerHTML = '<p>Error al filtrar productos. Por favor, intente de nuevo más tarde.</p>';
                    });
            });
        });
    }

    // Inicializar la página de productos
    function initProductPage() {
        loadAllProducts();
        setupCategoryFilters();
    }

    // Verificar si el usuario está autenticado
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'index.html'; // Redirigir al login si no está autenticado
    } else {
        initProductPage();
    }

    // Función para salir
    function salir() {
        if (confirm('¿Está seguro que desea salir?')) {
            sessionStorage.removeItem('authToken');
            window.location.href = 'index.html';
        }
    }

    // Configurar el botón de salir
    if (logoutBtn) {
        logoutBtn.addEventListener('click', salir);
    }

    // Función para el carrito
    function cambiarAlCarrito() {
        window.location.href = 'relacionDePedidos.html';
    }

    // Configurar el botón de carrito
    if (cartBtn) {
        cartBtn.addEventListener('click', cambiarAlCarrito);
    }

});