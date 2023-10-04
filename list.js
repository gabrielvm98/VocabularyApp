var userId = localStorage.getItem('userId') || null;
var authorization = localStorage.getItem('authorization') || null;

function getVocabulariesByUserId(userId) {
    // Realiza la solicitud GET al backend API para obtener vocabularios por ID de usuario
    fetch(`https://upcvocabularyapi.azurewebsites.net/vocabulary/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${authorization}` // Agrega la autorización si es necesaria
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Vocabularios del usuario:', data);
        localStorage.setItem('Vocabularies', JSON.stringify(data));

        // Obtén una referencia a la tabla en el HTML
        const tableBody = document.querySelector('tbody');

        // Limpia cualquier contenido existente en la tabla
        tableBody.innerHTML = '';

        // Recorre los datos de vocabularios y crea filas de tabla para cada uno
        data.forEach(vocabulary => {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vocabulary.name}</td>
                <td>${vocabulary.languageA}</td>
                <td>${vocabulary.languageB}</td>
                <td><button onclick="viewDetails(${vocabulary.vocabularyId})" class="button">Ver Detalles</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener vocabularios:', error);
    });
}


const logoutButton = document.getElementById('logoutButton');

// Agregar un controlador de eventos al botón de cerrar sesión
logoutButton.addEventListener('click', function() {
    // Eliminar los datos almacenados en localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('authorization');
    localStorage.removeItem('Vocabularies');

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
});


function viewDetails(vocabularyId) {
    // Redirigir al usuario a la página de detalle de vocabulario con el ID del vocabulario
    window.location.href = `detail.html?vocabularyId=${vocabularyId}`;
}


// Verificar si el usuario está autenticado (puedes usar tu lógica para esto)
if (userId) {
    // Llamar a la función para obtener vocabularios por ID de usuario
    getVocabulariesByUserId(userId);
}else{
    window.location.href = 'login.html';
}