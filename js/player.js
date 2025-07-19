const DEFAULT_PLAYER = {
  id: 1,
  name: "Héroe de la Web",
  health: 100,
  maxHealth: 100,
  attack: 10,
  defense: 5,
  luck: 80,
  inventory: [
    { name: "Poción", type: "heal", value: 25 }
  ]
};

/**
 * Obtiene el estado actual del jugador desde localStorage o el valor por defecto.
 */
export function getPlayer() {
  return JSON.parse(localStorage.getItem('player')) || { ...DEFAULT_PLAYER };
}

/**
 * Guarda el estado del jugador en localStorage.
 */
export function savePlayer(player) {
  localStorage.setItem('player', JSON.stringify(player));
}

/**
 * Actualiza el estado del jugador con los cambios indicados.
 */
export function updatePlayer(updates) {
  const player = getPlayer();
  Object.assign(player, updates);
  savePlayer(player);
  return player;
}

/**
 * Añade un objeto al inventario del jugador.
 */
export function addItemToInventory(item) {
  const player = getPlayer();
  player.inventory.push(item);
  savePlayer(player);
}

/**
 * Elimina un objeto del inventario del jugador.
 */
export function removeItemFromInventory(itemName) {
  const player = getPlayer();
  player.inventory = player.inventory.filter(item => item.name !== itemName);
  savePlayer(player);
}

/**
 * Reinicia el jugador al estado por defecto.
 */
export function resetPlayer() {
  savePlayer({ ...DEFAULT_PLAYER });
  return { ...DEFAULT_PLAYER };
}