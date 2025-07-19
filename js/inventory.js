export const items = [
  {
    id: 1,
    name: "Poción",
    type: "heal",
    effect: { health: +25 },
    isSuitable: false,
    instantEffect: true,
    temporal: false
  },
  {
    id: 2,
    name: "Llave oxidada",
    type: "key",
    effect: { unlock: "puerta antigua" },
    isSuitable: false,
    instantEffect: false,
    temporal: true
  },
  {
    id: 3,
    name: "Antorcha",
    type: "torch",
    effect: { light: true },
    isSuitable: true,
    instantEffect: false,
    temporal: true
  },
  {
    id: 4,
    name: "Espada corta",
    type: "weapon",
    effect: { attack: +10 },
    isSuitable: true,
    instantEffect: false,
    temporal: false
  },
  {
    id: 5,
    name: "Armadura de cuero",
    type: "armor",
    effect: { defense: +5 },
    isSuitable: true,
    instantEffect: false,
    temporal: false
  },
  {
    id: 6,
    name: "Libro misterioso",
    type: "book",
    effect: { luck: +75 },
    isSuitable: false,
    instantEffect: true,
    temporal: false
  },
  {
    id: 7,
    name: "Amuleto mágico",
    type: "magical",
    effect: { health: +15, luck: +50 },
    isSuitable: true,
    instantEffect: false,
    temporal: false
  },
  {
    id: 8,
    name: "Vial de veneno",
    type: "poison",
    effect: { health: -20 },
    isSuitable: false,
    instantEffect: true,
    temporal: false
  }
];
