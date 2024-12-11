// Importação dos módulos Firebase usando a versão modular
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADYP33W40W4dCZCPb50YSX0jesT0XXmRo",
  authDomain: "sisauth-ab1f9.firebaseapp.com",
  projectId: "sisauth-ab1f9",
  storageBucket: "sisauth-ab1f9.firebasestorage.app",
  messagingSenderId: "702719969696",
  appId: "1:702719969696:web:4b8e961823989f33c4fcc5"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const regEmailInput = document.getElementById("reg_email");
    const regPasswordInput = document.querySelector(".sing-up input[type='password']");
    const loginEmailInput = document.querySelector(".sing-in input[type='email']");
    const loginPasswordInput = document.querySelector(".sing-in input[type='password']");
    const regButton = document.getElementById("registrar");
    const loginButton = document.querySelector(".sing-in button");

    // Registrar novo usuário
    regButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão

        const email = regEmailInput.value;
        const password = regPasswordInput.value;

        if (email && password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert("Usuário registrado com sucesso!");
                console.log("User:", userCredential.user);
            } catch (error) {
                console.error("Erro ao registrar usuário:", error.message);
                alert(`Erro: ${error.message}`);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Fazer login
    loginButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão

        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        if (email && password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User:", userCredential.user);
                window.location.href = "/pages/HomePage.html";
            } catch (error) {
                console.error("Erro ao fazer login:", error.message);
                alert(`Erro: ${error.message}`);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});
