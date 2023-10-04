var userId = localStorage.getItem('userId') || null;
var vocabulariesData = JSON.parse(localStorage.getItem('Vocabularies')) || [];

// Obtener el ID del vocabulario de los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const vocabularyId = urlParams.get('vocabularyId');

// Variables para llevar un seguimiento de la práctica
let currentIndex = 0; // Índice de la palabra actual
let score = 0; // Puntaje

// Obtener la lista desordenada de pares de palabras
const wordPairs = vocabulariesData.find(vocabulary => vocabulary.vocabularyId.toString() === vocabularyId).wordPairs;
shuffleArray(wordPairs); // Función para desordenar el arreglo

// Elementos del DOM
const practiceArea = document.getElementById('practiceArea');
const nextWordPairButton = document.getElementById('nextWordPair');
const finishPracticeButton = document.getElementById('finishPractice');
const returnToDetailButton = document.getElementById('returnToDetail');

// Función para desordenar un arreglo (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para mostrar la palabra actual
function displayCurrentWordPair() {
    if (currentIndex < wordPairs.length) {
        const currentWordPair = wordPairs[currentIndex];
        const word = currentWordPair.word;
        const translation = currentWordPair.translation;

        practiceArea.innerHTML = `
            <h2>Palabra:</h2>
            <p>${word}</p>
            <h3>Traduccion:</h3>
            <input type="text" id="translationInput">
            <button id="checkTranslation" class="button">Comprobar</button>
            <p id="resultMessage"></p>
            <p>Puntaje: ${score}</p>
        `;

        const checkTranslationButton = document.getElementById('checkTranslation');
        const translationInput = document.getElementById('translationInput');
        const resultMessage = document.getElementById('resultMessage');

        checkTranslationButton.addEventListener('click', () => {
            const userTranslation = translationInput.value.trim().toLowerCase();
            const correctTranslation = translation.toLowerCase();

            if (userTranslation === correctTranslation) {
                score++;
                resultMessage.textContent = 'Correcto!';
                resultMessage.style.color = 'green';
            } else {
                resultMessage.textContent = `Incorrecto. La traduccion correcta es: ${correctTranslation}`;
                resultMessage.style.color = 'red';
            }

            // Deshabilitar el botón de comprobar y el campo de entrada después de la respuesta
            checkTranslationButton.disabled = true;
            translationInput.disabled = true;

            // Mostrar el botón de siguiente palabra
            nextWordPairButton.style.display = 'block';
        });

        nextWordPairButton.style.display = 'none';
    } else {
        // Todas las palabras se han practicado, mostrar puntaje final
        practiceArea.innerHTML = `
            <h2>Puntaje Final:</h2>
            <p>${score} / ${wordPairs.length}</p>
        `;
    }
}

// Función para pasar a la siguiente palabra
nextWordPairButton.addEventListener('click', () => {
    currentIndex++;

    // Reiniciar la pantalla de práctica
    practiceArea.innerHTML = '';
    displayCurrentWordPair();
});

// Función para finalizar la práctica y volver a la página de detalle
finishPracticeButton.addEventListener('click', () => {
    window.location.href = `detail.html?vocabularyId=${vocabularyId}`;
});

// Función para volver a la página de detalle
returnToDetailButton.addEventListener('click', () => {
    window.location.href = `detail.html?vocabularyId=${vocabularyId}`;
});

// Verificar si el usuario está autenticado
if (userId) {
    // Comenzar la práctica
    displayCurrentWordPair();
} else {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    window.location.href = 'login.html';
}
