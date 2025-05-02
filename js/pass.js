document.addEventListener("DOMContentLoaded", () => {
    const password = "tu"; // Cambia "tu" por la contraseña deseada
    const hotContainer = document.querySelector(".hot-container");
    const emojiImage = document.getElementById("emojiImage");
    document.body.classList.add("blurred"); // Añade la clase de desenfoque
    hotContainer.style.display = "none"; // Oculta el div inicialmente

    const userInput = prompt("Introduce la contraseña para acceder:");

    if (userInput !== password) {
        alert("Contraseña incorrecta. Serás redirigido al inicio.");
        window.location.href = "../index.html"; // Redirige al índice
    } else {
        alert("Contraseña correcta. Bienvenido.");
        document.body.classList.remove("blurred"); // Elimina el desenfoque
        hotContainer.style.display = "block"; // Muestra el div
        emojiImage.style.display = "block"; // Muestra la imagen
    }
});