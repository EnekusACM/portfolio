// Verificar si el navegador soporta la API de reconocimiento de voz
if (!('webkitSpeechRecognition' in window)) {
    alert('Lo siento, tu navegador no soporta reconocimiento de voz.');
} else {
    // Crear una instancia del reconocimiento de voz
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma
    recognition.continuous = false; // No continuar escuchando después de un resultado
    recognition.interimResults = false; // No mostrar resultados intermedios

    // Evento que se dispara cuando se obtiene un resultado
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Obtener el texto reconocido
        console.log('Texto reconocido:', transcript);
        alert(`Has dicho: "${transcript}"`);
    };

    // Evento que se dispara en caso de error
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        alert('Ocurrió un error durante el reconocimiento de voz.');
    };

    // Evento que se dispara cuando se detiene el reconocimiento
    recognition.onend = () => {
        console.log('Reconocimiento de voz detenido.');
    };

    // Iniciar el reconocimiento de voz al hacer clic en un botón
    const startButton = document.createElement('button');
    startButton.textContent = 'Habla ahora';
    startButton.style.padding = '10px 20px';
    startButton.style.fontSize = '16px';
    startButton.style.cursor = 'pointer';
    startButton.addEventListener('click', () => {
        recognition.start();
        console.log('Reconocimiento de voz iniciado.');
    });

    // Agregar el botón al documento
    document.body.appendChild(startButton);
}
