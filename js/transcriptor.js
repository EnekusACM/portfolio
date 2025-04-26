// Verificar si el navegador soporta la API de reconocimiento de voz
if (!('webkitSpeechRecognition' in window)) {
    alert('Lo siento, tu navegador no soporta reconocimiento de voz.');
} else {
    // Crear una instancia del reconocimiento de voz
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma
    recognition.continuous = false; // No continuar escuchando después de un resultado
    recognition.interimResults = false; // No mostrar resultados intermedios

    // Obtener referencia al ícono de carga
    const loadingIcon = document.getElementById('loadingIcon');

    // Evento que se dispara cuando se obtiene un resultado
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Obtener el texto reconocido
        console.log('Texto reconocido:', transcript);
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.textContent = transcript; // Mostrar el texto en el <p>
        loadingIcon.style.display = 'none'; // Ocultar el ícono de carga
    };

    // Evento que se dispara en caso de error
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        alert('Ocurrió un error durante el reconocimiento de voz.');
        loadingIcon.style.display = 'none'; // Ocultar el ícono de carga
    };

    // Evento que se dispara cuando se detiene el reconocimiento
    recognition.onend = () => {
        console.log('Reconocimiento de voz detenido.');
        loadingIcon.style.display = 'none'; // Ocultar el ícono de carga
    };

    // Iniciar el reconocimiento de voz al hacer clic en un botón
    const startButton = document.getElementById('startVoice');
    startButton.addEventListener('click', () => {
        recognition.start();
        console.log('Reconocimiento de voz iniciado.');
        loadingIcon.style.display = 'block'; // Mostrar el ícono de carga
    });

    // Agregar funcionalidad para copiar al portapapeles
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar en portapapeles';
    copyButton.style.marginLeft = '10px';
    copyButton.addEventListener('click', () => {
        const resultadoElement = document.getElementById('resultado');
        const textToCopy = resultadoElement.textContent;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert('Texto copiado al portapapeles.'))
                .catch(err => console.error('Error al copiar al portapapeles:', err));
        } else {
            alert('No hay texto para copiar.');
        }
    });

    // Agregar el botón de copiar al lado del <p>
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.insertAdjacentElement('afterend', copyButton);
}