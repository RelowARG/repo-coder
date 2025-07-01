// Importa las funciones que necesitas de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// La configuración de tu aplicación web de Firebase
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

// Inicializa Cloud Firestore y obtén una referencia al servicio.
export const db = getFirestore(app);
