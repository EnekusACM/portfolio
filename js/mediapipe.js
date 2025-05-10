const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  // Depuración: Verifica si se están recibiendo resultados
  console.log('Resultados:', results);

  // Ajusta las dimensiones del canvas al tamaño del video
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Dibuja la imagen del video en el canvas
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height
  );

  // Dibuja las conexiones y puntos de referencia de las manos
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});

      // Detecta si la punta del índice (8) y el pulgar (4) están juntos
      const indexTip = landmarks[8]; // Punta del índice
      const thumbTip = landmarks[4]; // Punta del pulgar

      // Calcula la distancia euclidiana entre los dos puntos
      const distance = Math.sqrt(
        Math.pow(indexTip.x - thumbTip.x, 2) +
        Math.pow(indexTip.y - thumbTip.y, 2) +
        Math.pow(indexTip.z - thumbTip.z, 2)
      );

      // Si la distancia es menor a un umbral, redirige a la URL
      if (distance < 0.05) { // Ajusta el umbral según sea necesario
        window.location.href = 'https://enekusacm.github.io/portfolio/index.html'; // Cambia por tu URL
      }
    }
  }
  canvasCtx.restore();
}

// Configuración de MediaPipe Hands
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

// Configuración de la cámara
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 640, // Ajusta el tamaño según tu preferencia
  height: 480
});
camera.start();