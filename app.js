document.addEventListener('DOMContentLoaded', loadAllProducts);


// Manejo de inicio de sesión en index.html

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores ingresados
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizar el POST con fetch a la API de autenticación
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(json => {
        if (json.token) {
            // Guardar el token en localStorage para futuras solicitudes si es necesario
            localStorage.setItem('token', json.token);
            alert('Inicio de sesión exitoso');
            window.location.href = "productos.html";  // Redirigir a productos.html
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(err => {
        console.error('Error en la autenticación:', err);
        alert('Hubo un problema con el inicio de sesión.');
    });
});

// Código para productos.html

// Cargar todos los productos al cargar la página
window.onload = function() {
    loadProducts();
};

// Función para cargar todos los productos
function loadAllProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';  // Limpiar la lista de productos

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-card');  // Añadir clase para estilos

                // Estructura HTML de la tarjeta de producto
                productDiv.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" width="150">
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <p>${product.description}</p>
                    <p><strong>Categoría:</strong> ${product.category}</p>
                    <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                `;
                productList.appendChild(productDiv);  // Añadir la tarjeta al contenedor
            });

            // Funcionalidad del botón "Agregar al carrito"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);  // Aquí se puede implementar la lógica del carrito
                });
            });
        })
        .catch(err => console.error(err));
}

// Función para manejar la búsqueda
document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
});

// Función para filtrar productos por categoría
document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const selectedCategory = this.value;
        loadProducts(selectedCategory);
    });
});

// Función para mostrar productos
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Limpiar lista de productos

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>Precio: $${product.price}</p>
            <p>${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
        `;
        productList.appendChild(productDiv);
    });

    // Agregar funcionalidad para botón de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Función para agregar producto al carrito
function addToCart(productId) {
    alert(`Producto con ID ${productId} agregado al carrito.`);
}

// Función para cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = "index.html";
});
