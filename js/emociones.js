const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const context = overlay.getContext('2d');
const emotionText = document.getElementById('emotion');

async function start() {
  try {
    // Cargar los modelos necesarios de face-api.js
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models')
    ]);

    // Solicitar acceso a la cámara
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error('Error al iniciar la cámara o cargar los modelos:', error);
    emotionText.innerText = 'Error: No se pudo acceder a la cámara o cargar los modelos.';
  }
}

video.addEventListener('play', () => {
  // Ajustar el tamaño del canvas al tamaño del video
  overlay.width = video.videoWidth;
  overlay.height = video.videoHeight;

  setInterval(async () => {
    try {
      // Detectar caras y emociones
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      // Limpiar el canvas
      context.clearRect(0, 0, overlay.width, overlay.height);

      // Dibujar las detecciones en el canvas
      faceapi.draw.drawDetections(overlay, detections);

      // Mostrar la emoción más probable
      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const maxEmotion = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b);
        emotionText.innerText = `Emoción: ${maxEmotion[0]} (${(maxEmotion[1] * 100).toFixed(1)}%)`;
      } else {
        emotionText.innerText = 'Emoción: No detectada';
      }
    } catch (error) {
      console.error('Error durante la detección:', error);
    }
  }, 200);
});

// Iniciar la aplicación
start();