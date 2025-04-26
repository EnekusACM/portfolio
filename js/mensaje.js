// Crear un cuadro de diálogo personalizado
const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.backgroundColor = 'white';
modal.style.padding = '20px';
modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
modal.style.display = 'none';
modal.style.zIndex = '1000';
modal.style.borderRadius = '25px'; // Borde redondeado

// Título del cuadro de diálogo
const title = document.createElement('h2');
title.textContent = '¡Atención: Mensaje del día!';
title.style.textAlign = 'center';
modal.appendChild(title);

// Mensaje del cuadro de diálogo
const message = document.createElement('p');
message.textContent = '¡Eres un ser humano muy bonico!';
message.style.textAlign = 'center';
modal.appendChild(message);

// Botón para cerrar el cuadro de diálogo
const closeButton = document.createElement('button');
closeButton.textContent = 'Cierra este hermoso mensaje :(';
closeButton.className = 'welcome-button';
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.appendChild(closeButton);

// Agregar el cuadro de diálogo al documento
document.body.appendChild(modal);

// Mostrar el cuadro de diálogo al hacer clic en el botón
document.getElementById('boton').addEventListener('click', () => {
    modal.style.display = 'block';
});