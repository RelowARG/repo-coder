// Guarda este archivo como 'seed.js' en la raíz de tu proyecto.
// Luego, desde tu terminal, ejecuta 'node seed.js'.

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ¡IMPORTANTE! Reemplaza esto con tus credenciales reales de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyD6inViPD-Kh-FkrgosjeSUJumOQWHabEU",
  authDomain: "ecommerce-coderhouse-4670c.firebaseapp.com",
  projectId: "ecommerce-coderhouse-4670c",
  storageBucket: "ecommerce-coderhouse-4670c.appspot.com",
  messagingSenderId: "926294835813",
  appId: "1:926294835813:web:cb00fc51a6003970cffc8c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Array con 30 productos de ejemplo (10 por categoría) con imágenes de tamaño uniforme (400x400)
const products = [
  // Laptops
  {
    name: "Apple MacBook Pro 16\"",
    price: 2499,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=MacBook+Pro",
    stock: 25,
    description: "La notebook para profesionales más potente, con chip M3 Max y una espectacular pantalla Liquid Retina XDR."
  },
  {
    name: "Dell XPS 15",
    price: 2100,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=Dell+XPS",
    stock: 30,
    description: "Pantalla OLED InfinityEdge y rendimiento excepcional para creadores de contenido y profesionales."
  },
  {
    name: "HP Spectre x360 14",
    price: 1650,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=HP+Spectre",
    stock: 40,
    description: "Diseño convertible 2-en-1 con pantalla táctil y lápiz óptico para máxima versatilidad."
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1850,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=ThinkPad",
    stock: 50,
    description: "Ultraligera y resistente, la herramienta definitiva para la productividad empresarial."
  },
  {
    name: "Razer Blade 15",
    price: 2300,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=Razer+Blade",
    stock: 20,
    description: "El portátil gaming por excelencia con gráficos NVIDIA GeForce RTX y chasis de aluminio."
  },
  {
    name: "Asus ROG Zephyrus G14",
    price: 1450,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=ROG+Zephyrus",
    stock: 35,
    description: "Potencia y portabilidad en un portátil gaming de 14 pulgadas con pantalla AniMe Matrix™."
  },
  {
    name: "Microsoft Surface Laptop 5",
    price: 1300,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=Surface+Laptop",
    stock: 60,
    description: "Elegancia y rendimiento con una increíble experiencia de escritura y pantalla táctil PixelSense."
  },
  {
    name: "LG Gram 17",
    price: 1700,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=LG+Gram",
    stock: 28,
    description: "Sorprendentemente ligera para su tamaño de 17 pulgadas, ideal para multitarea con gran portabilidad."
  },
  {
    name: "Samsung Galaxy Book3 Pro",
    price: 1450,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=Galaxy+Book",
    stock: 45,
    description: "Pantalla Dynamic AMOLED 2X y un ecosistema conectado para una productividad sin límites."
  },
  {
    name: "Acer Swift Go 14",
    price: 900,
    category: "laptops",
    img: "https://placehold.co/400x400/1e1e1e/90caf9?text=Acer+Swift",
    stock: 70,
    description: "Rendimiento y portabilidad a un precio accesible, con procesadores Intel Core de última generación."
  },
  // Smartphones
  {
    name: "Apple iPhone 15 Pro",
    price: 999,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=iPhone+15+Pro",
    stock: 120,
    description: "Construido en titanio, con el revolucionario chip A17 Pro y un sistema de cámaras Pro más potente."
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Galaxy+S24",
    stock: 80,
    description: "Galaxy AI está aquí. El estándar de la fotografía móvil con S Pen integrado y rendimiento épico."
  },
  {
    name: "Google Pixel 8 Pro",
    price: 899,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Pixel+8+Pro",
    stock: 90,
    description: "La magia de Google en tu mano. Cámara con IA, chip Tensor G3 y la mejor experiencia Android."
  },
  {
    name: "OnePlus 12",
    price: 799,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=OnePlus+12",
    stock: 60,
    description: "Rendimiento insignia y carga ultrarrápida. Suave, rápido y sin compromisos."
  },
  {
    name: "Xiaomi 14 Ultra",
    price: 1199,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Xiaomi+14",
    stock: 50,
    description: "Co-diseñado con Leica, ofrece una experiencia fotográfica profesional en un smartphone."
  },
  {
    name: "Asus ROG Phone 8 Pro",
    price: 1399,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=ROG+Phone+8",
    stock: 40,
    description: "El smartphone gaming definitivo, con rendimiento extremo, gatillos AirTrigger y refrigeración avanzada."
  },
  {
    name: "Samsung Galaxy Z Fold 5",
    price: 1799,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Galaxy+Z+Fold",
    stock: 30,
    description: "Una pantalla inmersiva de cine que se pliega para caber en tu bolsillo. La multitarea elevada a otro nivel."
  },
  {
    name: "Motorola Razr+",
    price: 999,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Motorola+Razr",
    stock: 55,
    description: "Diseño plegable icónico con la pantalla externa más grande y funcional del mercado."
  },
  {
    name: "Sony Xperia 1 V",
    price: 1399,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Xperia+1+V",
    stock: 25,
    description: "Creado para fotógrafos y cineastas, con sensor Exmor T y control manual completo."
  },
  {
    name: "Nothing Phone (2)",
    price: 599,
    category: "smartphones",
    img: "https://placehold.co/400x400/1e1e1e/f48fb1?text=Nothing+Phone",
    stock: 75,
    description: "Diseño transparente único con la interfaz Glyph para una nueva forma de interactuar."
  },
  // Accesorios
  {
    name: "Apple AirPods Pro (2ª gen)",
    price: 249,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=AirPods+Pro",
    stock: 250,
    description: "Cancelación activa de ruido superior, audio espacial personalizado y un estuche de carga mejorado."
  },
  {
    name: "Sony WH-1000XM5",
    price: 399,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Sony+XM5",
    stock: 150,
    description: "Los mejores auriculares con cancelación de ruido del mercado, con un sonido y comodidad excepcionales."
  },
  {
    name: "Logitech MX Master 3S",
    price: 99,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=MX+Master+3S",
    stock: 300,
    description: "Mouse ergonómico de precisión con clics silenciosos y desplazamiento electromagnético MagSpeed."
  },
  {
    name: "Keychron K8 Pro",
    price: 109,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Keychron+K8",
    stock: 180,
    description: "Teclado mecánico inalámbrico personalizable con QMK/VIA para una experiencia de escritura superior."
  },
  {
    name: "Anker 737 Power Bank",
    price: 149,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Anker+737",
    stock: 220,
    description: "Batería externa de 24,000mAh con carga ultrarrápida de 140W para laptops y otros dispositivos."
  },
  {
    name: "Logitech C920 HD Pro Webcam",
    price: 79,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Logitech+C920",
    stock: 400,
    description: "Videollamadas nítidas en Full HD 1080p, el estándar de oro para las webcams."
  },
  {
    name: "Blue Yeti USB Microphone",
    price: 129,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Blue+Yeti",
    stock: 130,
    description: "Micrófono USB profesional para grabación, streaming y podcasting con calidad de estudio."
  },
  {
    name: "Samsung T7 Shield SSD Portátil",
    price: 159,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Samsung+T7",
    stock: 90,
    description: "Almacenamiento externo rápido y resistente con protección IP65 contra agua y polvo."
  },
  {
    name: "Razer Kiyo Pro",
    price: 199,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Razer+Kiyo",
    stock: 110,
    description: "Webcam de streaming profesional con sensor de luz adaptable para una calidad de imagen superior."
  },
  {
    name: "Elgato Stream Deck MK.2",
    price: 149,
    category: "accesorios",
    img: "https://placehold.co/400x400/1e1e1e/ffffff?text=Stream+Deck",
    stock: 160,
    description: "Controlador de estudio con 15 teclas LCD personalizables para automatizar tus streams y flujos de trabajo."
  }
];


// Función que sube los productos a Firebase
const seedProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    console.log("Iniciando la carga de productos...");
    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Producto '${product.name}' agregado.`);
    }
    console.log("¡Carga de productos completada!");
  } catch (error) {
    console.error("Error al cargar productos: ", error);
  }
  // Cierra el proceso de Node para que la terminal quede libre
  process.exit(0);
};

// Ejecutamos la función
seedProducts();