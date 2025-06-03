// Dummy data for development purposes

export const dummyProducts = [
  {
    id: 1,
    name: "Café Orgánico Premium",
    price: 12.99,
    image: "https://images.pexels.com/photos/4820815/pexels-photo-4820815.jpeg",
    category: "Alimentos",
    description: "Café de origen único, cultivado orgánicamente en las alturas de Colombia.",
    stores: [
      { id: 1, name: "Mercado Central" },
      { id: 3, name: "Tienda Gourmet" }
    ],
    isOnSale: true
  },
  {
    id: 2,
    name: "Camiseta Algodón Ecológico",
    price: 24.99,
    image: "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg",
    category: "Moda",
    description: "Camiseta de algodón 100% ecológico y comercio justo.",
    stores: [
      { id: 2, name: "Boutique Moderna" },
      { id: 4, name: "EcoModa" }
    ]
  },
  {
    id: 3,
    name: "Jarrón Artesanal",
    price: 35.50,
    image: "https://images.pexels.com/photos/6069544/pexels-photo-6069544.jpeg",
    category: "Hogar",
    description: "Jarrón de cerámica hecho a mano por artesanos locales.",
    stores: [
      { id: 1, name: "Mercado Central" }
    ]
  },
  {
    id: 4,
    name: "Pack de Velas Aromáticas",
    price: 18.99,
    image: "https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg",
    category: "Hogar",
    description: "Set de 3 velas aromáticas con fragancias naturales.",
    stores: [
      { id: 3, name: "Tienda Gourmet" },
      { id: 5, name: "Casa & Decoración" }
    ],
    isOnSale: true
  },
  {
    id: 5,
    name: "Mermelada Artesanal",
    price: 6.99,
    image: "https://images.pexels.com/photos/5419344/pexels-photo-5419344.jpeg",
    category: "Alimentos",
    description: "Mermelada artesanal de frutas locales sin conservantes.",
    stores: [
      { id: 1, name: "Mercado Central" },
      { id: 3, name: "Tienda Gourmet" }
    ]
  },
  {
    id: 6,
    name: "Libro 'El arte de cocinar'",
    price: 29.99,
    image: "https://images.pexels.com/photos/1179460/pexels-photo-1179460.jpeg",
    category: "Libros",
    description: "Recetas tradicionales para el cocinero moderno.",
    stores: [
      { id: 6, name: "Librería Cultural" }
    ]
  },
  {
    id: 7,
    name: "Planta de Interior",
    price: 15.50,
    image: "https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg",
    category: "Hogar",
    description: "Planta de interior fácil de cuidar, ideal para purificar el aire.",
    stores: [
      { id: 5, name: "Casa & Decoración" }
    ],
    isOnSale: true
  },
  {
    id: 8,
    name: "Set de Té Japonés",
    price: 42.99,
    image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg",
    category: "Hogar",
    description: "Juego de té tradicional japonés con tetera y 4 tazas.",
    stores: [
      { id: 3, name: "Tienda Gourmet" },
      { id: 5, name: "Casa & Decoración" }
    ]
  },
  {
    id: 9,
    name: "Bolso de Cuero",
    price: 89.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "Moda",
    description: "Bolso de cuero genuino con acabados artesanales.",
    stores: [
      { id: 2, name: "Boutique Moderna" },
      { id: 4, name: "EcoModa" }
    ]
  },
  {
    id: 10,
    name: "Chocolates Surtidos",
    price: 14.99,
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg",
    category: "Alimentos",
    description: "Caja de chocolates artesanales con diferentes rellenos.",
    stores: [
      { id: 1, name: "Mercado Central" },
      { id: 3, name: "Tienda Gourmet" }
    ],
    isOnSale: true
  },
  {
    id: 11,
    name: "Aceite de Oliva Extra Virgen",
    price: 11.99,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg",
    category: "Alimentos",
    description: "Aceite de oliva de primera presión en frío.",
    stores: [
      { id: 1, name: "Mercado Central" },
      { id: 3, name: "Tienda Gourmet" }
    ]
  },
  {
    id: 12,
    name: "Lámpara de Mesa",
    price: 49.99,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    category: "Hogar",
    description: "Lámpara de mesa moderna con base de madera natural.",
    stores: [
      { id: 5, name: "Casa & Decoración" }
    ]
  }
];

export const dummyStores = [
  {
    id: 1,
    name: "Mercado Central",
    address: "Calle Principal 123",
    location: { lat: 19.432608, lng: -99.133209 },
    image: "https://images.pexels.com/photos/2611814/pexels-photo-2611814.jpeg"
  },
  {
    id: 2,
    name: "Boutique Moderna",
    address: "Av. Moda 456",
    location: { lat: 19.436403, lng: -99.140305 },
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg"
  },
  {
    id: 3,
    name: "Tienda Gourmet",
    address: "Plaza Gourmet 789",
    location: { lat: 19.427983, lng: -99.128353 },
    image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg"
  },
  {
    id: 4,
    name: "EcoModa",
    address: "Calle Sustentable 321",
    location: { lat: 19.441889, lng: -99.146332 },
    image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg"
  },
  {
    id: 5,
    name: "Casa & Decoración",
    address: "Blvd. Hogareño 654",
    location: { lat: 19.424695, lng: -99.154086 },
    image: "https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg"
  },
  {
    id: 6,
    name: "Librería Cultural",
    address: "Av. de los Libros 987",
    location: { lat: 19.449336, lng: -99.135789 },
    image: "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg"
  }
];

export const dummyCouriers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    phone: "+52 55 1234 5678",
    transportType: "Motocicleta",
    rateTable: "1-5 km: $30\n6-10 km: $50\n11-15 km: $70\nPeso máximo: 10kg",
    maxWeight: 10,
    status: "active",
    avatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg"
  },
  {
    id: 2,
    name: "Ana Martínez",
    phone: "+52 55 8765 4321",
    transportType: "Bicicleta",
    rateTable: "1-3 km: $25\n4-7 km: $40\n8-10 km: $60\nPeso máximo: 5kg",
    maxWeight: 5,
    status: "active",
    avatar: "https://images.pexels.com/photos/3869208/pexels-photo-3869208.jpeg"
  },
  {
    id: 3,
    name: "José Fernández",
    phone: "+52 55 5678 1234",
    transportType: "Automóvil",
    rateTable: "1-10 km: $60\n11-20 km: $90\n21-30 km: $120\nPeso máximo: 30kg",
    maxWeight: 30,
    status: "inactive",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
  },
  {
    id: 4,
    name: "Sofía Hernández",
    phone: "+52 55 4321 5678",
    transportType: "Motocicleta",
    rateTable: "1-5 km: $35\n6-10 km: $55\n11-15 km: $75\nPeso máximo: 8kg",
    maxWeight: 8,
    status: "active",
    avatar: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg"
  }
];

export const dummyOffers = [
  {
    id: 1,
    title: "Descuento 20% en Cafés",
    description: "Válido hasta el 30 de Junio",
    products: [1, 11],
    validUntil: "2025-06-30",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    discount: 20
  },
  {
    id: 2,
    title: "3x2 en Productos del Hogar",
    description: "Compra 3 y paga 2 en artículos seleccionados",
    products: [3, 4, 7, 12],
    validUntil: "2025-07-15",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    discount: 33
  },
  {
    id: 3,
    title: "Envío gratis en Moda",
    description: "En todas las prendas de la nueva colección",
    products: [2, 9],
    validUntil: "2025-07-31",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
    discount: 0
  }
];

export const dummyCategories = [
  {
    id: 1,
    name: "Alimentos",
    count: 12,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
  },
  {
    id: 2,
    name: "Moda",
    count: 15,
    image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg"
  },
  {
    id: 3,
    name: "Hogar",
    count: 18,
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  },
  {
    id: 4,
    name: "Regalos",
    count: 8,
    image: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg"
  },
  {
    id: 5,
    name: "Libros",
    count: 10,
    image: "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg"
  }
];