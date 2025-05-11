const videoElement = document.querySelector('.input_video');
const outputCanvas = document.querySelector('.output_canvas');
const segmentationCanvas = document.querySelector('.segmentation_canvas');
const outputCtx = outputCanvas.getContext('2d');
const segmentationCtx = segmentationCanvas.getContext('2d');
const filterSelect = document.getElementById('filter-select');
const backgroundSelect = document.getElementById('background-select');
const backgroundUpload = document.getElementById('background-upload');

let customBackground = null;
const predefinedBackgrounds = {
  forest: '../img/forest.jpg',
  beach: '../img/beach.jpg',
  city: '../img/city.jpg'
};

let selectedPredefinedImage = new Image();
selectedPredefinedImage.src = '';

backgroundSelect.addEventListener('change', () => {
  const selected = backgroundSelect.value;
  customBackground = null;

  if (predefinedBackgrounds[selected]) {
    selectedPredefinedImage.src = predefinedBackgrounds[selected];
  } else {
    selectedPredefinedImage.src = '';
  }
});

backgroundUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      customBackground = img;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

const pose = new Pose({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`});
selfieSegmentation.setOptions({ modelSelection: 1 });

function onPoseResults(results) {
  const w = videoElement.videoWidth;
  const h = videoElement.videoHeight;
  outputCanvas.width = segmentationCanvas.width = w;
  outputCanvas.height = segmentationCanvas.height = h;

  outputCtx.save();
  outputCtx.clearRect(0, 0, w, h);
  outputCtx.drawImage(results.image, 0, 0, w, h);

  if (results.poseLandmarks) {
    drawConnectors(outputCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
    drawLandmarks(outputCtx, results.poseLandmarks, {color: '#FF0000', lineWidth: 2});
  }
  outputCtx.restore();
}

function applyFilter(ctx, w, h, type) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    switch (type) {
      case 'grayscale':
        const avg = (r + g + b) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
        break;
      case 'invert':
        data[i] = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
        break;
      case 'sepia':
        data[i] = (r * .393) + (g * .769) + (b * .189);
        data[i + 1] = (r * .349) + (g * .686) + (b * .168);
        data[i + 2] = (r * .272) + (g * .534) + (b * .131);
        break;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function onSegmentationResults(results) {
  const w = videoElement.videoWidth;
  const h = videoElement.videoHeight;
  segmentationCanvas.width = w;
  segmentationCanvas.height = h;

  segmentationCtx.clearRect(0, 0, w, h);
  segmentationCtx.drawImage(results.segmentationMask, 0, 0, w, h);
  segmentationCtx.globalCompositeOperation = 'source-in';
  segmentationCtx.drawImage(results.image, 0, 0, w, h);

  const filter = filterSelect.value;
  if (filter !== 'normal') applyFilter(segmentationCtx, w, h, filter);

  segmentationCtx.globalCompositeOperation = 'destination-over';
  if (customBackground) {
    segmentationCtx.drawImage(customBackground, 0, 0, w, h);
  } else if (selectedPredefinedImage.src) {
    segmentationCtx.drawImage(selectedPredefinedImage, 0, 0, w, h);
  } else {
    segmentationCtx.fillStyle = '#111';
    segmentationCtx.fillRect(0, 0, w, h);
  }
  segmentationCtx.globalCompositeOperation = 'source-over';
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await selfieSegmentation.send({image: videoElement});
    await pose.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();

pose.onResults(onPoseResults);
selfieSegmentation.onResults(onSegmentationResults);

document.getElementById('save-image').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'captura.png';
  link.href = segmentationCanvas.toDataURL('image/png');
  link.click();
});
document.getElementById('reset-background').addEventListener('click', () => {
  backgroundSelect.value = 'none';
  customBackground = null;
  selectedPredefinedImage.src = '';
});