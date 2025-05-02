const emojiList = ["😀", "😎", "🐶", "🐱", "🌼", "🍕", "🧠", "👾"];
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
let score = 0;
let gridSize = 2;

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

// Comprobar si existe la cookie "juegoMoji"
let record = parseInt(getCookie("juegoMoji")) || 0;

function createGrid() {
  game.innerHTML = "";
  game.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Cambiado a 1fr para columnas flexibles
  game.style.width = 'fit-content'; // Cambiado a 1fr para filas flexibles
  const baseEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  let diffEmoji;
  do {
    diffEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  } while (diffEmoji === baseEmoji);
  const total = gridSize * gridSize;
  const diffIndex = Math.floor(Math.random() * total);
  for (let i = 0; i < total; i++) {
    const span = document.createElement("span");
    span.classList.add("emoji");
    span.textContent = i === diffIndex ? diffEmoji : baseEmoji;
    span.addEventListener("click", () => {
      if (i === diffIndex) {
        score++;
        gridSize = Math.min(gridSize + 1, 12);
        scoreDisplay.textContent = `Puntos: ${score}`;
        // Actualizar el récord si es necesario
        if (score > record) {
          record = score;
          setCookie("juegoMoji", record, 365); // Guardar el récord en la cookie
        }
        createGrid();
      } else {
        score = 0;
        gridSize = 2;
        scoreDisplay.textContent = `¡Fallaste! Puntos: ${score}`;
        setTimeout(createGrid, 1000);
      }
    });
    game.appendChild(span);
  }
}

// Mostrar el récord inicial
scoreDisplay.textContent = `Puntos: ${score} | Récord: ${record}`;

createGrid();