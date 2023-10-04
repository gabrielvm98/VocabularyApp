const toggleFormButton = document.getElementById('toggleFormButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
registerForm.style.display = 'none';

var userId = localStorage.getItem('userId') || null;
var authorization = localStorage.getItem('authorization') || null;



// Agregar un controlador de eventos al botón de cambio
toggleFormButton.addEventListener('click', function() {
    // Toggle (mostrar u ocultar) los formularios
    if (loginForm.style.display === 'none') {
        // Cambiar a formulario de inicio de sesión
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleFormButton.textContent = 'Cambiar a Registro';

        // Borrar valores en el formulario de registro
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    } else {
        // Cambiar a formulario de registro
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleFormButton.textContent = 'Cambiar a Inicio de Sesión';

        // Borrar valores en el formulario de inicio de sesión
        emailInput.value = '';
        passwordInput.value = '';
    }
});






// Función para manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Obtener los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos de inicio de sesión
    const loginData = {
        name: '',
        email: email,
        password: password
    };

    // Realizar la solicitud POST al backend API para iniciar sesión
    fetch('https://upcvocabularyapi.azurewebsites.net/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData) // Convertir el objeto loginData a formato JSON
    })
    .then(response => response.text())
    .then(data => {
        // Verificar la respuesta del servidor
        if (data.startsWith('Successfully Login')) {
            // Extrayendo el ID del usuario de la respuesta
            userId = parseInt(data.split('-')[1]);
            authorization = btoa(`${email}:${password}`)
            localStorage.setItem('userId', userId);
            localStorage.setItem('authorization', authorization);

            // Inicio de sesión exitoso, puedes mostrar un mensaje o redirigir al usuario
            console.log('Inicio de sesión exitoso. ID del usuario:', userId, authorization);

            // Redirigir al usuario a otra página (por ejemplo, la página de listado de vocabulario)
            window.location.href = 'list.html';
        } else {
            // Inicio de sesión fallido, muestra un mensaje de error
            console.error('Error en el inicio de sesión:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});

// Función para manejar el registro
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;

    // Crear un objeto con los datos del usuario a registrar
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Realizar la solicitud POST al backend API para registrar un nuevo usuario
    fetch('https://upcvocabularyapi.azurewebsites.net/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // Convertir el objeto userData a formato JSON
    })
    .then(response => response.text()) // Convertir la respuesta a texto
    .then(data => {
        // Verificar si la respuesta es "Successfully created"
        if (data === 'Successfully created') {
            // Registro exitoso, puedes mostrar un mensaje o redirigir al usuario
            console.log('Registro exitoso:', data);

            document.getElementById('name').value = '';
            document.getElementById('newEmail').value = '';
            document.getElementById('newPassword').value = '';

            // Cambiar al formulario de inicio de sesión
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleFormButton.textContent = 'Cambiar a Registro';

            // Mostrar el mensaje emergente de registro exitoso
            const popup = document.getElementById('popup');
            const popupMessage = document.getElementById('popupMessage');
            popupMessage.textContent = 'Registro exitoso.';
            popup.style.display = 'block';

            // Ocultar el mensaje emergente después de unos segundos (puedes ajustar el tiempo)
            setTimeout(function() {
                popup.style.display = 'none';
            }, 5000);

        } else {
            // Registro fallido, muestra un mensaje de error
            console.error('Error en el registro:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});


