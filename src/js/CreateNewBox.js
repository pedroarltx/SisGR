import { db } from "./FirebaseInit.js"; // Certifique-se de que sua inicialização do Firestore está correta
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"; // Funções do Firestore

// Função para renderizar as boxes na tela
async function renderBoxes() {
  const querySnapshot = await getDocs(collection(db, "boxes"));
  const boxesContainer = document.getElementById("boxes-container");
  boxesContainer.innerHTML = ""; // Limpar as boxes existentes

  // Para cada box, cria o elemento e exibe na tela
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    
    var novaBox = document.createElement("article");
    novaBox.classList.add("trat_qbox");
    novaBox.setAttribute("data-id", doc.id);

    var h2 = document.createElement("h2");
    h2.textContent = data.titulo;
    novaBox.appendChild(h2);

    var ol = document.createElement("ol");
    data.conteudo.forEach((conteudo) => {
      const li = document.createElement("li");
      li.textContent = conteudo;
      ol.appendChild(li);
    });
    novaBox.appendChild(ol);

    // Adiciona a nova box ao container
    boxesContainer.appendChild(novaBox);
  });

  // Atualiza a lista de boxes no modal de exclusão
  atualizarListaExcluir();
  // Atualiza a lista de boxes no modal de edição
  atualizarListaEditar();
}

// Função para carregar as opções no modal de exclusão
async function atualizarListaExcluir() {
  const selectDeleteBox = document.getElementById("selectDeleteBox");
  selectDeleteBox.innerHTML = ""; // Limpar as opções antes de atualizar

  const querySnapshot = await getDocs(collection(db, "boxes"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = data.titulo;
    selectDeleteBox.appendChild(option);
  });
}

// Função para carregar as opções no modal de edição
async function atualizarListaEditar() {
  const selectBox = document.getElementById("selectBox");
  selectBox.innerHTML = ""; // Limpar as opções antes de atualizar

  const querySnapshot = await getDocs(collection(db, "boxes"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = data.titulo;
    selectBox.appendChild(option);
  });
}

// Função para abrir o modal de edição e preencher com os dados da box
async function abrirModalEdicao() {
  const selectBox = document.getElementById("selectBox");
  const selectedId = selectBox.value; // Pega o ID da box selecionada

  if (!selectedId) {
    alert("Selecione uma box para editar.");
    return;
  }

  // Obtém os dados da box selecionada
  const docRef = doc(db, "boxes", selectedId);
  const docSnap = await getDocs(docRef);
  const data = docSnap.data();

  if (data) {
    // Preenche o formulário com os dados da box selecionada
    document.getElementById("editTitulo").value = data.titulo;
    const conteudoInputs = document.querySelectorAll(".edit-conteudo");

    data.conteudo.forEach((conteudo, index) => {
      if (conteudoInputs[index]) {
        conteudoInputs[index].value = conteudo;
      }
    });
  }

  // Abre o modal de edição
  $("#modalEditBox").modal("show");
}

// Função para salvar as alterações no Firestore
document.getElementById("salvarAlteracoes").addEventListener("click", async () => {
  const selectBox = document.getElementById("selectBox");
  const selectedId = selectBox.value;

  if (!selectedId) {
    alert("Selecione uma box para editar.");
    return;
  }

  const novoTitulo = document.getElementById("editTitulo").value;
  const conteudoInputs = document.querySelectorAll(".edit-conteudo");
  const novosConteudos = Array.from(conteudoInputs).map((input) => input.value).filter(c => c.trim() !== "");

  if (novoTitulo && novosConteudos.length > 0) {
    try {
      // Atualiza a box no Firestore
      await updateDoc(doc(db, "boxes", selectedId), {
        titulo: novoTitulo,
        conteudo: novosConteudos,
      });
      $("#modalEditBox").modal("hide"); // Fecha o modal de edição
      renderBoxes(); // Atualiza as boxes renderizadas
    } catch (e) {
      console.error("Erro ao salvar as alterações: ", e);
    }
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// Função para adicionar uma nova box
document.getElementById("adicionarBox").addEventListener("click", async function () {
  var titulo = document.getElementById("titulo").value;
  const conteudoInputs = document.querySelectorAll("#conteudo");
  const conteudo = Array.from(conteudoInputs)
    .map((input) => input.value)
    .filter((c) => c.trim() !== ""); // Remove linhas vazias

  if (titulo && conteudo.length > 0) {
    try {
      // Adiciona a nova box no Firestore
      const docRef = await addDoc(collection(db, "boxes"), {
        titulo: titulo,
        conteudo: conteudo,
        createdAt: new Date(),
      });
      console.log("Documento escrito com ID: ", docRef.id);
      renderBoxes(); // Atualiza a lista de boxes renderizadas
      $("#modalBox").modal("hide"); // Fecha o modal de criação
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  } else {
    alert("Por favor, preencha todos os campos (Título e Conteúdo).");
  }
});

// Função de excluir (já estava implementada antes)
async function excluirBox() {
  const selectDeleteBox = document.getElementById("selectDeleteBox");
  const docId = selectDeleteBox.value;

  if (docId) {
    try {
      const docRef = doc(db, "boxes", docId);
      await deleteDoc(docRef); // Deleta o documento do Firestore
      console.log("Documento excluído com ID: ", docId);
      renderBoxes(); // Atualiza a lista de boxes após a exclusão
      $("#modalDeleteBox").modal("hide"); // Fecha o modal de exclusão
    } catch (e) {
      console.error("Erro ao excluir documento: ", e);
    }
  } else {
    alert("Selecione uma box para excluir.");
  }
}

// Adiciona o evento para o botão de excluir no modal
document.getElementById("excluirBoxBtn").addEventListener("click", excluirBox);

// Chama a função de renderizar as boxes ao carregar a página
document.addEventListener("DOMContentLoaded", renderBoxes);
