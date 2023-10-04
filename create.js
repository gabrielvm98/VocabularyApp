var userId = localStorage.getItem('userId') || null;
var authorization = localStorage.getItem('authorization') || null;

// Función para agregar dinámicamente un par de palabras al formulario
function addWordPair() {
    const wordPairsContainer = document.getElementById('wordPairsContainer');

    const wordPairDiv = document.createElement('div');

    const wordLabel = document.createElement('label');
    wordLabel.textContent = 'Palabra:';
    const wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.id = 'word';

    const translationLabel = document.createElement('label');
    translationLabel.textContent = 'Traducción:';
    const translationInput = document.createElement('input');
    translationInput.type = 'text';
    translationInput.id = 'translation';


    wordPairDiv.appendChild(wordLabel);
    wordPairDiv.appendChild(wordInput);
    wordPairDiv.appendChild(translationLabel);
    wordPairDiv.appendChild(translationInput);

    wordPairsContainer.appendChild(wordPairDiv);
}

// Agregar un controlador de eventos al botón "Agregar Par de Palabras"
document.getElementById('addWordPairButton').addEventListener('click', addWordPair);

// Agregar un controlador de eventos al formulario de creación de vocabulario
document.getElementById('createVocabularyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const languageA = document.getElementById('languageA').value;
    const languageB = document.getElementById('languageB').value;
    const isPublic = document.getElementById('isPublic').checked;

    const wordPairs = [];
    const wordPairDivs = document.querySelectorAll('#wordPairsContainer > div');

    // Recorrer los pares de palabras y obtener sus valores
    wordPairDivs.forEach(wordPairDiv => {
        const wordInput = wordPairDiv.querySelector('input[id = "word"]');
        const translationInput = wordPairDiv.querySelector('input[id = "translation"]');
        const word = wordInput.value;
        const translation = translationInput.value;

        if (word && translation) {
            wordPairs.push({ word, translation });
        }
    });

    // Crear un objeto con los datos del vocabulario
    const vocabularyData = {
        userId: userId, // Asegúrate de que userId esté disponible en este contexto
        name: name,
        description: description,
        languageA: languageA,
        languageB: languageB,
        isPublic: isPublic,
        wordPairs: wordPairs
    };

    // Realizar una solicitud POST al backend API para crear el vocabulario
    fetch('https://upcvocabularyapi.azurewebsites.net/vocabulary', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authorization}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vocabularyData)
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Successfully created') {
            console.log('Vocabulario creado con exito:', data);
            // Puedes redirigir al usuario o mostrar un mensaje de éxito
            window.location.href = 'list.html';

        } else {
            console.error('Error al crear el vocabulario:', data);
            // Puedes manejar el caso de error según tus necesidades
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});
