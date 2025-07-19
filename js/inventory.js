export const items = [
  {
    id: 1,
    name: "Poción",
    type: "heal",
    effect: { health: +25 },
    isSuitable: false,
    instantEffect: true,
    temporal: false,
    image: "./img/potion.png"
  },
  {
    id: 2,
    name: "Llave rara",
    type: "key",
    effect: { unlock: "cerradura" },
    isSuitable: false,
    instantEffect: false,
    temporal: true,
    image: "./img/key.png"
  },
  {
    id: 3,
    name: "Antorcha",
    type: "torch",
    effect: { light: true },
    isSuitable: true,
    instantEffect: false,
    temporal: true,
    image: "./img/torch.png"
  },
  {
    id: 4,
    name: "Espada corta",
    type: "weapon",
    effect: { attack: +10 },
    isSuitable: true,
    instantEffect: false,
    temporal: false,
    image: "./img/sword.png"
  },
  {
    id: 5,
    name: "Armadura de cuero",
    type: "armor",
    effect: { defense: +5 },
    isSuitable: true,
    instantEffect: false,
    temporal: false,
    image: "./img/armor.png"
  },
  {
    id: 6,
    name: "Libro misterioso",
    type: "book",
    effect: { luck: +75 },
    isSuitable: false,
    instantEffect: true,
    temporal: false,
    image: "./img/books.png"
  },
  {
    id: 7,
    name: "Amuleto mágico",
    type: "magical",
    effect: { health: +15, luck: +50 },
    isSuitable: true,
    instantEffect: false,
    temporal: false,
    image: "./img/amulet.png"
  },
  {
    id: 8,
    name: "Vial de veneno",
    type: "poison",
    effect: { health: -20 },
    isSuitable: false,
    instantEffect: true,
    temporal: false,
    image: "./img/poison.png"
  }
];