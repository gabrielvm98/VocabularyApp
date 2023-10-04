var userId = localStorage.getItem('userId') || null;


function displayVocabularyDetails(vocabularyId) {
    const vocabulariesData = JSON.parse(localStorage.getItem('Vocabularies'));    
    const vocabulary = vocabulariesData.find(vocabulary => vocabulary.vocabularyId.toString() === vocabularyId);
    console.log(vocabulary)


    const vocabularyDetails = document.getElementById('vocabularyDetails');
    
    // Crea elementos HTML para mostrar los detalles del vocabulario
    const nameElement = document.createElement('h2');
    nameElement.textContent = `Nombre: ${vocabulary.name}`;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Descripcion: ${vocabulary.description}`;
    
    const languageAElement = document.createElement('p');
    languageAElement.textContent = `Idioma A: ${vocabulary.languageA}`;
    
    const languageBElement = document.createElement('p');
    languageBElement.textContent = `Idioma B: ${vocabulary.languageB}`;
    
    const isPublicElement = document.createElement('p');
    isPublicElement.textContent = `Public: ${vocabulary.isPublic ? 'Si' : 'No'}`;
    
    // Agrega los elementos al contenedor de detalles
    vocabularyDetails.appendChild(nameElement);
    vocabularyDetails.appendChild(descriptionElement);
    vocabularyDetails.appendChild(languageAElement);
    vocabularyDetails.appendChild(languageBElement);
    vocabularyDetails.appendChild(isPublicElement);

    // Obtén una referencia a la tabla en el HTML
    const tableBody = document.querySelector('tbody');
    // Limpia cualquier contenido existente en la tabla
    tableBody.innerHTML = '';
    vocabulary.wordPairs.forEach(wordPair => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${wordPair.word}</td>
            <td>${wordPair.translation}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('practiceButton').addEventListener('click', function() {   
    if (vocabularyId) {
        // Redirigir al usuario a la página de práctica de palabras con el ID del vocabulario
        window.location.href = `practice.html?vocabularyId=${vocabularyId}`;
    } else {
        console.error('ID de vocabulario no encontrado en los parámetros de la URL.');
    }
});

// Obtener el ID del vocabulario de los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const vocabularyId = urlParams.get('vocabularyId');

// Verificar si el usuario está autenticado (puedes usar tu lógica para esto)
if (userId) {
    // Llamar a la función para obtener los detalles del vocabulario por su ID
    displayVocabularyDetails(vocabularyId);
} else {
    window.location.href = 'login.html';
}
