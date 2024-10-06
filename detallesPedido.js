document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.getElementById('ordersTableBody');
    const totalElement = document.getElementById('total');
    let total = 0;

    
    //obtener el nombre del usuario
    const storedUsername = localStorage.getItem('username');
    // Mostrar el nombre en el mensaje de bienvenida
    welcomeMessage.textContent += storedUsername;
    // Mostrar el nombre en el campo "Cliente"
    const clienteInput = document.getElementById('cliente');
    clienteInput.value = storedUsername;

    // Obtener el ID del carrito almacenado
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
        // Consumir la API del carrito para obtener los productos
        fetch(`https://fakestoreapi.com/carts/${cartId}`)
            .then(res => res.json())
            .then(cart => {
                const products = cart.products;

                // Recorrer los productos del carrito
                products.forEach(product => {
                    // Hacer fetch para obtener detalles del producto usando el productId
                    fetch(`https://fakestoreapi.com/products/${product.productId}`)
                        .then(res => res.json())
                        .then(productDetails => {
                            const row = document.createElement('tr');
                            const subtotal = product.quantity * productDetails.price;
                            total += subtotal;

                            row.innerHTML = `
                                <td>${productDetails.title}</td>
                                <td>${product.quantity}</td>
                                <td>$${productDetails.price.toFixed(2)}</td>
                                <td>$${subtotal.toFixed(2)}</td>
                            `;

                            ordersTableBody.appendChild(row);
                            totalElement.textContent = `$${total.toFixed(2)}`;
                        })
                        .catch(error => {
                            console.error('Error al obtener detalles del producto:', error);
                        });
                });
            })
            .catch(error => {
                console.error('Error al obtener el carrito:', error);
                ordersTableBody.innerHTML = '<tr><td colspan="4">Error al cargar los productos. Intente de nuevo más tarde.</td></tr>';
            });
    } else {
        console.error('No se encontró el ID del carrito.');
        ordersTableBody.innerHTML = '<tr><td colspan="4">No se encontró el ID del carrito. Por favor, regrese al listado de pedidos.</td></tr>';
    }

    // Botones de acción (sin funcionalidad por ahora)
    document.getElementById('actualizarBtn').addEventListener('click', () => {
        alert('Funcionalidad pendiente');
    });

    document.getElementById('confirmarBtn').addEventListener('click', () => {
        alert('Funcionalidad pendiente');
    });

    document.getElementById('seguirComprandoBtn').addEventListener('click', () => {
        window.location.href = 'productos.html';
    });

    // Función para manejar el botón de salir
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('¿Está seguro que desea salir?')) {
            // Eliminar datos del localStorage y sessionStorage
            localStorage.removeItem('username');
            localStorage.removeItem('userId'); // Eliminar el ID del usuario
            sessionStorage.removeItem('authToken');
            
            // Redirigir al usuario a la página de inicio de sesión (index.html)
            window.location.href = 'index.html';
        }
    });


    
});
