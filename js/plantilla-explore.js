import { getPlayer, savePlayer, addItemToInventory, updatePlayer, resetPlayer } from './player.js';
import { items } from './inventory.js';

let player = getPlayer();
if (typeof player.luck !== 'number') {
  player = resetPlayer();
  savePlayer(player);
}

function renderInventory() {
  const inv = document.getElementById('inventory');
  inv.innerHTML = player.inventory.map(item =>
    `<div class="item">${item.name}</div>`
  ).join('');
}
function toggleInventory() {
  const inv = document.getElementById('inventory');
  if (inv.classList.contains('hidden')) {
    renderInventory();
    inv.classList.remove('hidden');
  } else {
    inv.classList.add('hidden');
  }
}

function createRandomSpots() {
  const luck = player.luck;
  const randomLuck = luck + (Math.floor(Math.random() * 41) - 20);
  const finalLuck = Math.max(0, Math.min(100, randomLuck));
  let numSpots = Math.ceil(finalLuck / 25);
  numSpots = Math.max(1, Math.min(5, numSpots));
  console.log(`Número de spots a crear: ${numSpots} (Suerte: ${finalLuck})`);
  const main = document.querySelector('main');
  const usedIndexes = new Set();
  for (let i = 0; i < numSpots; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * items.length);
    } while (usedIndexes.has(idx));
    usedIndexes.add(idx);

    const item = items[idx];
    const spot = document.createElement('div');
    spot.className = 'explore-spot';
    spot.style.position = 'absolute';
    spot.style.top = `${100 + Math.random() * 400}px`;
    spot.style.left = `${100 + Math.random() * 800}px`;
    spot.textContent = `¡Encontraste ${item.name}!`;
    spot.dataset.itemId = item.id;

    spot.addEventListener('mouseenter', function() {
  if (spot.classList.contains('found') || spot.classList.contains('visible')) return;
  spot.classList.add('visible');
  const modal = document.createElement('div');
  modal.className = 'explore-modal';
  modal.innerHTML = `
    <div class="item-card">
      <img src="${item.image}" alt="${item.name}" style="width:64px;height:64px;display:block;margin:auto;">
      <h3>${item.name}</h3>
      <p><strong>Tipo:</strong> ${item.type}</p>
      <p><strong>Efecto:</strong> ${Object.entries(item.effect).map(([k,v]) => `${k}: ${v}`).join(', ')}</p>
      <p><strong>Equipable:</strong> ${item.isSuitable ? 'Sí' : 'No'}</p>
      <p><strong>Efecto instantáneo:</strong> ${item.instantEffect ? 'Sí' : 'No'}</p>
      <p><strong>Temporal:</strong> ${item.temporal ? 'Sí' : 'No'}</p>
      <div style="margin-top:10px;">
        <button class="guardar-btn">Guardar</button>
        <button class="usar-btn">Usar ahora</button>
        <button class="ignorar-btn">Seguir Explorando</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  function closeModal() {
    document.body.removeChild(modal);
    spot.classList.remove('visible');
  }

  modal.querySelector('.guardar-btn').onclick = () => {
    addItemToInventory(item);
    player = getPlayer();
    renderInventory();
    spot.classList.add('found');
    closeModal();
  };

  modal.querySelector('.usar-btn').onclick = () => {
    if (item.type === "heal" && item.effect && item.effect.health) {
      updatePlayer({ health: Math.min(player.maxHealth, player.health + item.effect.health) });
    }
    player = getPlayer();
    renderInventory();
    spot.classList.add('found');
    closeModal();
  };

  modal.querySelector('.ignorar-btn').onclick = () => {
    spot.classList.add('found');
    closeModal();
  };
});

    main.appendChild(spot);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createRandomSpots();
});
window.toggleInventory = toggleInventory;
