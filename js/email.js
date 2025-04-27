document.addEventListener("DOMContentLoaded", () => {
    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("formContainer");
    const sendEmailButton = document.getElementById("sendEmail");
    const messageBox = document.getElementById("messageBox");

    // Inicializar EmailJS correctamente
    emailjs.init("LOmf96oLgWkdKsmkJ"); // Solo la clave pública

    console.log("EmailJS inicializado correctamente");

    // Mostrar el formulario al hacer clic en el botón
    showFormButton.addEventListener("click", () => {
        console.log("Botón 'Escribir Mensaje' clickeado");
        formContainer.style.display = "block";
    });

    // Enviar el correo al hacer clic en "Enviar"
    sendEmailButton.addEventListener("click", () => {
        const message = messageBox.value;

        if (message.trim() === "") {
            alert("Por favor, escribe un mensaje.");
            return;
        }

        // Configurar los parámetros para la plantilla de EmailJS
        const templateParams = {
            message: message,
        };
        console.log("Enviando con parámetros:", templateParams);

        // Enviar el correo usando EmailJS
        emailjs.send("Enigmas.01", "template_0t27rac", templateParams)
            .then(() => {
                alert("Correo enviado con éxito.");
                messageBox.value = ""; // Limpiar el campo de texto
                formContainer.style.display = "none"; // Ocultar el formulario
            })
            .catch((error) => {
                console.error("Error al enviar el correo:", error);
                alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
            });
    });
});
