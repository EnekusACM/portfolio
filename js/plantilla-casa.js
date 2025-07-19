import { getPlayer, savePlayer } from './player.js';

let player = getPlayer();

function toggleInventory() {
  const inv = document.getElementById('inventory');
  if (inv.classList.contains('hidden')) {
    renderInventory();
    inv.classList.remove('hidden');
  } else {
    inv.classList.add('hidden');
  }
}

function renderInventory() {
  const inv = document.getElementById('inventory');
  inv.innerHTML = player.inventory.map(item => {
    let icon = "";
    if (item.name === "Poción") {
      icon = `<span style="margin-right:5px;">🧪</span>`;
    }
    return `<div class="item" style="display:flex;align-items:center;">${icon}${item.name}</div>`;
  }).join('');
}

function sleep() {
  player = getPlayer();
  player.health = player.maxHealth;
  savePlayer(player); // Guarda primero
  document.getElementById('narrative').innerText = "Has dormido y recuperado toda tu salud.";
  updateStatus(); // Ahora sí lee el valor actualizado
}

function goToBattle() {
  savePlayer(player);
  window.location.href = "init.html";
}
function goToExplore() {
  savePlayer(player);
  window.location.href = "plantilla-explore.html";
}

function updateStatus() {
  player = getPlayer();
  document.getElementById("status").innerHTML = `
    <h3>Estado</h3>
    <p><strong>${player.name}</strong>: ${player.health} / ${player.maxHealth} HP</p>
  `;
}

updateStatus();
window.toggleInventory = toggleInventory;
window.sleep = sleep;
window.goToBattle = goToBattle;
window.goToExplore = goToExplore;