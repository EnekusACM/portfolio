const circle = document.getElementById("circle");
const startBtn = document.getElementById("start-btn");
const message = document.getElementById("message");
const countdownMode = document.getElementById("countdown-mode");
const countdownDisplay = document.getElementById("countdown");
let appearTime, timeoutID, countdownInterval;

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
});

startBtn.addEventListener("click", () => {
    clearTimeout(timeoutID);
    clearInterval(countdownInterval);
    startGame();
});