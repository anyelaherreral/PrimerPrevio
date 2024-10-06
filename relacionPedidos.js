document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const ordersTableBody = document.getElementById('ordersTableBody');
    
    // Recuperar el nombre de usuario desde localStorage
    const storedUsername = localStorage.getItem('username');
    const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario
    if (storedUsername) {
        welcomeMessage.textContent += storedUsername;
    } else {
        welcomeMessage.textContent += 'Usuario';
    }

    // Verificar que el ID del usuario esté disponible
    if (userId) {
        // Consumir la API para obtener los pedidos del usuario por su ID
        fetch(`https://fakestoreapi.com/carts/user/${userId}`)
            .then(res => res.json())
            .then(carts => {
                console.log('Pedidos del usuario:', carts);
                // Recorrer los pedidos del usuario
                carts.forEach(cart => {
                    const row = document.createElement('tr');
                    row.dataset.cartId = cart.id; // Añade el data-attribute con el ID del carrito
                    row.innerHTML = `
                        <td>${cart.id}</td>
                        <td>${new Date(cart.date).toLocaleDateString()}</td>
                        <td><a href="#" class="view-details">Ver detalles</a></td>
                    `;
                    ordersTableBody.appendChild(row);
                
                    // Agregar evento para guardar el cartId al hacer clic en "Ver detalles"
                    row.querySelector('.view-details').addEventListener('click', () => {
                        localStorage.setItem('cartId', cart.id); // Guardar el cartId en localStorage
                        window.location.href = 'detallesPedido.html'; // Redirigir a la página de detalles
                    });
                });
            })
            .catch(error => {
                console.error('Error al cargar los pedidos:', error);
                ordersTableBody.innerHTML = '<tr><td colspan="3">Error al cargar los pedidos. Por favor, intente de nuevo más tarde.</td></tr>';
            });
    } else {
        console.error('No se encontró el ID del usuario en localStorage.');
        ordersTableBody.innerHTML = '<tr><td colspan="3">No se encontró el ID del usuario. Por favor, inicie sesión de nuevo.</td></tr>';
    }

    // Función para manejar el botón de salir
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('¿Está seguro que desea salir?')) {
            localStorage.removeItem('username');
            localStorage.removeItem('userId'); // Eliminar el ID del usuario también
            sessionStorage.removeItem('authToken');
            window.location.href = 'index.html';
        }
    });

    // Función para redirigir al carrito
    document.getElementById('cartBtn').addEventListener('click', () => {
        window.location.href = 'productos.html';
    });
});
