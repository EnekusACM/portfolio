const form = document.getElementById('character-form');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');
const characterImg = document.getElementById('character-img');
const characterName = document.getElementById('character-name');
const downloadBtn = document.getElementById('download-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const status = document.getElementById('status').value;
    const gender = document.getElementById('gender').value;

    if (!name && !status && !gender) {
        alert('Por favor, rellena al menos un filtro.');
        return;
    }

    let url = 'https://rickandmortyapi.com/api/character/?';
    const params = new URLSearchParams();

    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (gender) params.append('gender', gender);

    const loadingIndicator = document.createElement('p');
    loadingIndicator.textContent = 'Cargando...';
    form.appendChild(loadingIndicator);

    try {
        const res = await fetch(url + params.toString());
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error('No se encontró personaje con esos filtros.');
            } else {
                throw new Error('Error al conectar con la API.');
            }
        }
        const data = await res.json();

        const character = data.results[Math.floor(Math.random() * data.results.length)];
        if (data.results.length > 1) {
            alert(`Se encontró más de un personaje. Mostrando uno aleatorio.`);
        }
        characterImg.src = character.image;
        characterImg.alt = character.name;
        characterName.textContent = character.name;

        modal.style.display = 'flex';
    } catch (error) {
        alert(error.message);
    } finally {
        loadingIndicator.remove();
    }
});

closeBtn.onclick = () => modal.style.display = 'none';

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

downloadBtn.onclick = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = characterImg.src;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `${characterName.textContent}.jpg`;
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        alert('Imagen descargada con éxito.');
    };
};