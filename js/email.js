document.addEventListener("DOMContentLoaded", () => {
    const sendEmailButton = document.getElementById("sendEmail");
    const messageBox = document.getElementById("messageBox");
    const nameInput = document.getElementById("nameInput");
    const emailForm = document.getElementById("emailForm");

    // Inicializar EmailJS
    emailjs.init("LOmf96oLgWkdKsmkJ");

    console.log("EmailJS inicializado correctamente");

    // Habilitar o deshabilitar el botón según el contenido del textarea
    messageBox.addEventListener("input", () => {
        sendEmailButton.disabled = messageBox.value.trim().length < 5;
    });

    // Manejar el envío del formulario
    emailForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = messageBox.value.trim();
        const name = nameInput.value.trim();

        // Configurar los parámetros para la plantilla de EmailJS
        const templateParams = {
            name: name || "Anónimo",
            message: message,
        };

        console.log("Enviando con parámetros:", templateParams);

        // Enviar el correo usando EmailJS
        emailjs.send("Enigmas.01", "template_0t27rac", templateParams)
            .then(() => {
                alert("Correo enviado con éxito.");
                emailForm.reset(); // Limpiar el formulario
                sendEmailButton.disabled = true; // Deshabilitar el botón
            })
            .catch((error) => {
                console.error("Error al enviar el correo:", error);
                alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
            });
    });
});