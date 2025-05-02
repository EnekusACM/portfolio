const circle = document.getElementById("circle");
const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");
const countdownMode = document.getElementById("countdown-mode");
const countdownDisplay = document.getElementById("countdown");
let appearTime, timeoutID, countdownInterval;

// Función para obtener el valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Función para establecer una cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Comprobar si existe la cookie "bestReactionTime"
let bestReactionTime = parseFloat(getCookie("bestReactionTime")) || null;

// Mostrar el mejor tiempo al cargar la página
if (bestReactionTime !== null) {
    message.textContent = `Mejor tiempo registrado: ${bestReactionTime.toFixed(3)} segundos.`;
} else {
    message.textContent = "¡Presiona comenzar para iniciar el juego!";
}

function showCircle() {
    countdownDisplay.textContent = "";
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.display = "block";

    appearTime = Date.now();
}

function startGame() {
    message.textContent = "";
    circle.style.display = "none";
    countdownDisplay.textContent = "";

    if (countdownMode.checked) {
        let countdown = 3;
        countdownDisplay.textContent = `Aparecerá en: ${countdown}`;
        countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownDisplay.textContent = `Aparecerá en: ${countdown}`;
            } else {
                clearInterval(countdownInterval);
                showCircle();
            }
        }, 1000);
    } else {
        const delay = 3000; // 3 segundos
        timeoutID = setTimeout(showCircle, delay);
    }
}

circle.addEventListener("click", () => {
    const reactionTime = (Date.now() - appearTime) / 1000;
    circle.style.display = "none";
    message.textContent = `¡Buen reflejo! Tiempo de reacción: ${reactionTime.toFixed(3)} segundos.`;

    // Actualizar el mejor tiempo si es necesario
    if (bestReactionTime === null || reactionTime < bestReactionTime) {
        bestReactionTime = reactionTime;
        setCookie("bestReactionTime", bestReactionTime, 365); // Guardar el mejor tiempo en la cookie
        message.textContent += ` ¡Nuevo récord personal!`;
    } else {
        message.textContent += ` Mejor tiempo: ${bestReactionTime.toFixed(3)} segundos.`;
    }
});

startBtn.addEventListener("click", () => {
    clearTimeout(timeoutID);
    clearInterval(countdownInterval);
    startGame();
});