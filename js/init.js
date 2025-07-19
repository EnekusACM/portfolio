import { getPlayer, savePlayer, addItemToInventory, updatePlayer } from './player.js';

let player = getPlayer();

let enemy = {
  id: 1,
  name: "Slime malvado",
  health: 20,
  maxHealth: 20,
  attack: 8,
  defense: 3
};

function startBattle() {
  enemy.health = enemy.maxHealth;
  log(`⚔️ ¡Un ${enemy.name} aparece! ¡Prepárate para la batalla!`);
  updateStatus();
  showCombatOptions();
}

function showCombatOptions() {
  document.getElementById('options').innerHTML = `
    <button onclick="attack()">🗡️ Atacar</button>
    <button onclick="defend()">🛡️ Defender</button>
    <button onclick="useItem()">🧪 Usar objeto</button>
    <button onclick="tryToEscape()">🏃 Huir</button>
  `;
}

function attack() {
  const damage = Math.max(0, player.attack - enemy.defense);
  enemy.health -= damage;
  log(`Atacaste a ${enemy.name} e hiciste ${damage} puntos de daño.`);
  updateStatus();

  if (enemy.health <= 0) {
    log(`🎉 ¡Has derrotado al ${enemy.name}!`);
    endBattle();
  } else {
    setTimeout(enemyTurn, 1000);
  }
}

function defend() {
  log("Te pones en posición defensiva. ¡Prepárate para resistir el golpe!");
  player.defending = true;
  setTimeout(enemyTurn, 1000);
}

function useItem() {
  if (player.inventory.length === 0) {
    log("No tienes objetos en tu inventario.");
    return;
  }

  const potion = player.inventory.find(item => item.type === "heal");
  if (potion) {
    updatePlayer({ health: Math.min(player.maxHealth, player.health + (potion.value || 0)) });
    player = getPlayer();
    log(`Usaste una ${potion.name} y recuperaste ${potion.value} de salud.`);
    player.inventory = player.inventory.filter(item => item !== potion);
    savePlayer(player);
    updateStatus();
    setTimeout(enemyTurn, 1000);
  } else {
    log("No tienes objetos curativos.");
  }
}

function tryToEscape() {
  const chance = Math.random();
  if (chance < 0.3) {
    log("¡Has escapado exitosamente! 🏃💨");
    endBattle();
  } else {
    log("¡Intentaste huir pero el enemigo te alcanzó! 😅");
    setTimeout(enemyTurn, 1000);
  }
}

function enemyTurn() {
  const damage = Math.max(0, enemy.attack - (player.defending ? player.defense * 2 : player.defense));
  updatePlayer({ health: player.health - damage });
  player = getPlayer();
  log(`${enemy.name} te ataca y causa ${damage} de daño.`);
  player.defending = false;
  updateStatus();

  if (player.health <= 0) {
    log("💀 Has sido derrotado. ¡Inténtalo de nuevo!");
    endBattle();
  } else {
    showCombatOptions();
  }
}

function updateStatus() {
  document.getElementById("status").innerHTML = `
    <h3>Estado</h3>
    <p><strong>${player.name}</strong>: ${player.health} / ${player.maxHealth} HP</p>
    <p><strong>${enemy.name}</strong>: ${enemy.health} / ${enemy.maxHealth} HP</p>
  `;
}

function log(message) {
  const narrative = document.getElementById('narrative');
  narrative.innerText = message;
}

function endBattle() {
  document.getElementById("options").innerHTML = `
    <button onclick="startBattle()">🔍 Buscar otro enemigo</button>
    <button onclick="lootBody()">Registrar cuerpo</button>
    <button onclick="searchArea()">Buscar por el sitio</button>
    <button onclick="goHome()">🏠 Regresar a casa</button>
  `;
}

function lootBody() {
  const chanceEnemy = Math.random();
  if (chanceEnemy < 0.1) {
    log("¡Mientras registrabas el cuerpo, aparece otro enemigo!");
    setTimeout(startBattle, 1200);
    return;
  }
  // 50% de encontrar objeto
  const chanceItem = Math.random();
  if (chanceItem < 0.5) {
    const item = { name: "Poción", type: "heal", value: 25 };
    addItemToInventory(item);
    player = getPlayer();
    log("Encontraste una Poción en el cuerpo.");
    savePlayer(player);
  } else {
    log("No encontraste nada útil en el cuerpo.");
  }
  showPostBattleOptions();
}

function searchArea() {
  const chanceEnemy = Math.random();
  if (chanceEnemy < 0.1) {
    log("¡Mientras buscas por el sitio, aparece otro enemigo!");
    setTimeout(startBattle, 1200);
    return;
  }
  const chanceTrap = Math.random();
  if (chanceTrap < 0.2) {
    updatePlayer({ health: Math.max(0, player.health - 15) });
    player = getPlayer();
    log("¡Pisaste una trampa y perdiste 15 puntos de salud!");
    updateStatus();
    savePlayer(player);
    showPostBattleOptions();
    return;
  }
  // 20% de encontrar objeto
  const chanceItem = Math.random();
  if (chanceItem < 0.2) {
    const item = { name: "Llave misteriosa", type: "key" };
    addItemToInventory(item);
    player = getPlayer();
    log("Encontraste una Llave misteriosa.");
    savePlayer(player);
  } else {
    log("No encontraste nada interesante.");
  }
  showPostBattleOptions();
}

function showPostBattleOptions() {
  document.getElementById("options").innerHTML = `
    <button onclick="startBattle()">🔍 Buscar otro enemigo</button>
    <button onclick="goHome()">🏠 Regresar a casa</button>
  `;
  savePlayer(player);
}

function goHome() {
  window.location.href = "plantilla-casa.html";
}
window.startBattle = startBattle;
window.attack = attack;
window.defend = defend;
window.useItem = useItem;
window.tryToEscape = tryToEscape;
window.lootBody = lootBody;
window.searchArea = searchArea;
window.goHome = goHome;