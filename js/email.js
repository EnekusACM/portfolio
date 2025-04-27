document.addEventListener("DOMContentLoaded", () => {
    const showFormButton = document.getElementById("showForm");
    const formContainer = document.getElementById("formContainer");
    const sendEmailButton = document.getElementById("sendEmail");
    const messageBox = document.getElementById("messageBox");

    // Inicializar EmailJS con tu User ID
    emailjs.init("enekodev@outlook.es"); // Reemplaza con tu User ID

    // Mostrar el formulario al hacer clic en el botón
    showFormButton.addEventListener("click", () => {
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