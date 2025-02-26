// Importaciones modulares de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNWnFtBHuy4fhtZqHUfPCPxdkbN3eng-Q",
  authDomain: "whatnow-cc24e.firebaseapp.com",
  projectId: "whatnow-cc24e",
  storageBucket: "whatnow-cc24e.firebasestorage.app",
  messagingSenderId: "545409915334",
  appId: "1:545409915334:web:df85e1399cf1c087647ac7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de Auth y Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);