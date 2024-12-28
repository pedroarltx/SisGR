import { db } from "./FirebaseInit.js"; // Importa a instância do Firestore
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"; // Importa funções necessárias do Firestore

// Função para renderizar as boxes na tela dentro da aba "Boxes"
async function renderBoxes() {
  const querySnapshot = await getDocs(collection(db, "boxes"));
  const boxesContainer = document.getElementById("boxes-container"); // Referência para o container das boxes

  // Limpa o container para não duplicar as boxes se a página for recarregada
  boxesContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data(); // Obtém os dados do documento

    // Cria a nova box com a estrutura fornecida
    var novaBox = document.createElement("article");
    novaBox.classList.add("trat_qbox");
    novaBox.setAttribute("data-id", doc.id); // Adiciona o id do documento como um atributo

    var h2 = document.createElement("h2");
    h2.textContent = data.titulo;
    novaBox.appendChild(h2); // Adiciona o título

    var ol = document.createElement("ol");
    data.conteudo.forEach((conteudo) => {
      const li = document.createElement("li");
      li.textContent = conteudo;
      ol.appendChild(li);
    });
    novaBox.appendChild(ol); // Adiciona a lista

    // Botão de "Alterar"
    var editButton = document.createElement("button");
    editButton.textContent = "Alterar";
    editButton.classList.add("btn", "btn-warning", "btn-sm");
    editButton.addEventListener("click", () =>
      abrirModalEdicao(doc.id, data.titulo, data.conteudo)
    ); // Chama a função de editar

    // Botão de "Excluir"
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.addEventListener("click", () => deleteBox(doc.id)); // Chama a função de excluir

    // Adiciona os botões de editar e excluir à box
    novaBox.appendChild(editButton);
    novaBox.appendChild(deleteButton);

    // Adiciona a nova box dentro do container das boxes
    boxesContainer.appendChild(novaBox);
  });
}

// Função para abrir o modal de edição com dados preenchidos
async function abrirModalEdicao(docId, tituloAtual, conteudoAtual) {
  // Preenche o modal com os dados da box
  document.getElementById("editTitulo").value = tituloAtual;

  const conteudoInputs = document.querySelectorAll(".edit-conteudo");
  conteudoAtual.forEach((conteudo, index) => {
    if (conteudoInputs[index]) {
      conteudoInputs[index].value = conteudo;
    }
  });

  // Adiciona evento ao botão para salvar as alterações
  const salvarAlteracoesBtn = document.getElementById("salvarAlteracoes");
  salvarAlteracoesBtn.onclick = async () => {
    const novoTitulo = document.getElementById("editTitulo").value;
    const novosConteudos = Array.from(conteudoInputs)
      .map((input) => input.value)
      .filter((c) => c.trim() !== ""); // Remove linhas vazias

    if (novoTitulo && novosConteudos.length > 0) {
      await updateDoc(doc(db, "boxes", docId), {
        titulo: novoTitulo,
        conteudo: novosConteudos,
      });
      $("#modalEditBox").modal("hide"); // Fecha o modal
      renderBoxes(); // Atualiza as boxes renderizadas
    } else {
      alert("Preencha todos os campos.");
    }
  };

  // Abre o modal de edição
  $("#modalEditBox").modal("show");
}

// Função para excluir uma box
async function deleteBox(docId) {
  try {
    const docRef = doc(db, "boxes", docId); // Referência para o documento no Firestore
    await deleteDoc(docRef); // Deleta o documento
    console.log("Documento excluído com ID: ", docId);

    // Atualiza a interface removendo a box da tela
    const boxElement = document.querySelector(`[data-id='${docId}']`);
    boxElement.remove();
  } catch (e) {
    console.error("Erro ao excluir documento: ", e);
  }
}

// Função para adicionar uma nova box
document.getElementById("adicionarBox").addEventListener("click", async function () {
  var titulo = document.getElementById("titulo").value;
  const conteudoInputs = document.querySelectorAll("#conteudo");
  const conteudo = Array.from(conteudoInputs)
    .map((input) => input.value)
    .filter((c) => c.trim() !== ""); // Remove linhas vazias

  if (titulo && conteudo.length > 0) {
    try {
      const docRef = await addDoc(collection(db, "boxes"), {
        titulo: titulo,
        conteudo: conteudo,
        createdAt: new Date(),
      });
      console.log("Documento escrito com ID: ", docRef.id);
      renderBoxes(); // Atualiza as boxes renderizadas
      $("#modalBox").modal("hide"); // Fecha o modal de criação
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  } else {
    alert("Por favor, preencha todos os campos (Título e Conteúdo).");
  }
});

// Chama a função de renderizar as boxes ao carregar a página
document.addEventListener("DOMContentLoaded", renderBoxes);
