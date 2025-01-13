import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyADYP33W40W4dCZCPb50YSX0jesT0XXmRo",
    authDomain: "sisauth-ab1f9.firebaseapp.com",
    projectId: "sisauth-ab1f9",
    storageBucket: "sisauth-ab1f9.firebasestorage.app",
    messagingSenderId: "702719969696",
    appId: "1:702719969696:web:4b8e961823989f33c4fcc5"
};

const app = initializeApp(firebaseConfig);  // Inicializa o Firebase app
const db = getFirestore(app);  // Inicializa o Firestore

export { db };  // Exporta o db para outros arquivos