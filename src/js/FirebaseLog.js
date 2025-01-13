// seu-script.js

// Importe a instância do Firebase e os serviços necessários
import app from './firebase-config.js';  // Garanta que a configuração foi importada
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Função de logout
export function logout() {
  const auth = getAuth(app);  // Passa a instância do app inicializada
  auth
    .signOut()
    .then(() => {
      window.location.href = "index.html"; // Redirecionar após o logout
    })
    .catch(() => {
      alert("Erro ao fazer logout");
    });
}

// Tempo de inatividade antes do logout (em milissegundos)
const logoutTimeoutDuration = 1 * 60 * 60 * 1000; // 10 segundos
let logoutTimer;

// Função para reiniciar o temporizador
function resetLogoutTimer() {
  clearTimeout(logoutTimer); // Limpa o temporizador atual
  logoutTimer = setTimeout(() => {
    logout(); // Faz o logout automático
  }, logoutTimeoutDuration);
}

// Inicializar o monitoramento de interações do usuário
function setupUserActivityListener() {
  document.addEventListener("mousemove", resetLogoutTimer); // Detecta movimento do mouse
  document.addEventListener("keydown", resetLogoutTimer); // Detecta pressionamento de teclas
  resetLogoutTimer(); // Inicia o temporizador na primeira carga
}

// Monitorar o estado de autenticação do Firebase
function monitorAuthState() {
  const auth = getAuth(app);  // Passa a instância do app inicializada
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Se o usuário não está autenticado, redirecione
      window.location.href = "index.html";
    } else {
      // Se o usuário está autenticado, configurar o listener de inatividade
      setupUserActivityListener();
    }
  });
}

// Iniciar o monitoramento de autenticação
monitorAuthState();
