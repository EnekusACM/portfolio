const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const context = overlay.getContext('2d');
const emotionText = document.getElementById('emotion');

async function start() {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models')
  ]);

  const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
  video.srcObject = stream;
}

video.addEventListener('play', () => {
  overlay.width = video.videoWidth;
  overlay.height = video.videoHeight;

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    context.clearRect(0, 0, overlay.width, overlay.height);

    faceapi.draw.drawDetections(overlay, detections);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxEmotion = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b);
      emotionText.innerText = `Emoción: ${maxEmotion[0]} (${(maxEmotion[1] * 100).toFixed(1)}%)`;
    } else {
      emotionText.innerText = 'Emoción: No detectada';
    }
  }, 200);
});

start();
