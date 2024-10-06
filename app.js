document.addEventListener('DOMContentLoaded', () => {
  //const para inicio de sesion
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username'); // Input para el nombre de usuario
  const passwordInput = document.getElementById('password'); // Input para la contraseña


  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();// Prevenir el comportamiento por defecto del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Llamar a la API para obtener la lista de usuarios
    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(users => {
        // Buscar el usuario en la lista
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          // Guardar el nombre y apellido en localStorage
          const fullName = `${user.name.firstname} ${user.name.lastname}`;
          localStorage.setItem('username', fullName);
      
          // Guardar el ID del usuario en localStorage
          localStorage.setItem('userId', user.id); // Guardar el ID del usuario
      
          // También puedes guardar un token de autenticación si es necesario
          sessionStorage.setItem('authToken', 'authenticated'); // Almacenar el token de autenticación
      
          alert('Inicio de sesión exitoso.');
          window.location.href = 'productos.html'; // Redirigir al listado de productos
      } else {
          alert('Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
      }
      
      
    })
    .catch(error => {
        console.error('Error al validar las credenciales:', error);
        alert('Hubo un problema al validar las credenciales. Por favor, inténtelo más tarde.');
    });
});
});