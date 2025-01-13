document.addEventListener("DOMContentLoaded", () => {
  function copiarTexto(id) {
    const paragrafo = document.getElementById(id);
    const textarea = document.createElement("textarea");
    textarea.value = paragrafo.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    mostrarAlerta();
  }

  function mostrarAlerta() {
    const alerta = document.getElementById("alerta");
    alerta.style.display = "block";
    alerta.style.opacity = "1";

    setTimeout(() => {
      alerta.style.opacity = "0";
      setTimeout(() => {
        alerta.style.display = "none";
      }, 500);
    }, 2000);
  }

  function gerarTexto() {
    let texto = "";

    texto += gerarTextoContato(
      "motorista",
      "nome_motorista",
      "numero_motorista",
      "contato_condutor",
      "ocorrencia_motorista"
    );

    texto += gerarTextoContato(
      "responsável",
      "nome_responsavel",
      "numero_responsavel",
      "contato_responsavel",
      "ocorrencia_responsavel"
    );

    texto += gerarTextoGrupo();

    texto += gerarTextoPolicia();

    exibirTextoGerado(texto.trim());
  }

  function gerarTextoContato(
    tipo,
    nomeId,
    numeroId,
    contatoName,
    ocorrenciaId
  ) {
    const nome = document.getElementById(nomeId).value.trim();
    const numero = document.getElementById(numeroId).value.trim();
    const contato = document.querySelector(`input[name="${contatoName}"]:checked`);
    const ocorrencia = document.getElementById(ocorrenciaId).value.trim();

    if (!contato) return "";

    if (contato.value === "sim") {
      return `Em contato com o Sr. ${nome} (${tipo}), pelo telefone ${numero}, o mesmo nos informou que ${ocorrencia}. `;
    } else if (contato.value === "nao") {
      return `Tentamos contato com o Sr. ${nome} (${tipo}) através do telefone ${numero}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
    } else if (contato.value.includes("inexistente")) {
      return `Tentamos contato com o Sr. ${nome} (${tipo}) através do telefone ${numero}, porém o número consta como inexistente ou fora de área. `;
    }

    return "";
  }

  function gerarTextoGrupo() {
    const transportadoras = document.querySelector(
      'input[name="contato_responsavel_grupo"]:checked'
    );

    if (!transportadoras) return "";

    const grupos = {
      Qbox: "Qbox - Tecnorisk",
      Otimiza: "Otimiza - Tecnorisk",
      Adege: "Adege - Tecnorisk",
      GVM: "GVM - Tecnorisk",
      jvtrans: "JV Transportes - Tecnorisk",
      Rapido_parana: "Rápido Paraná - Tecnorisk",
      Bull_log: "Bull Log - Tecnorisk",
      Milk: "Milklat - Tecnorisk"
    };

    if (transportadoras.value in grupos) {
      return `Deste modo notificamos os responsáveis através do grupo de WhatsApp ${grupos[transportadoras.value]}, onde os deixamos ciente da situação. `;
    } else if (transportadoras.value === "restricao") {
      const restricaoHorario = document.getElementById("restricao_text").value.trim();
      if (restricaoHorario) {
        return `Como descrito em PRG não podemos entrar em contato com o responsável via ligação após ${restricaoHorario} horas, deste modo seguiremos o acionamento policial.`;
      }
    }

    return "";
  }

  function gerarTextoPolicia() {
    const nomePolicial = document.getElementById("nome_policial").value.trim();
    const numeroPolicial = document.getElementById("numero_policial").value.trim();
    const acionamentoPolicial = document.querySelector(
      'input[name="acionamento_policial"]:checked'
    );
    const ocorrenciaPolicial = document.getElementById("ocorrencia_policial").value.trim();

    if (!acionamentoPolicial) return "";

    if (acionamentoPolicial.value === "sim") {
      return `Sendo assim, seguiremos com o procedimento de contingência onde efetuamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, onde fomos atendidos pelo Sr. ${ocorrenciaPolicial}, e o deixamos ciente da situação. Segue nossa proposta de pronta resposta: `;
    } else if (acionamentoPolicial.value === "nao") {
      return `Sendo assim, seguimos com o procedimento de contingência onde tentamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, mas a ligação é direcionada para caixa postal. Segue nossa proposta de pronta resposta: `;
    } else if (acionamentoPolicial.value === "Continuidade") {
      return "Sendo assim, manteremos o acionamento policial ativo até normalizar a situação. Segue nossa proposta de pronta resposta:";
    }

    return "";
  }

  function exibirTextoGerado(texto) {
    const textoArea = document.getElementById("textoGerado");
    textoArea.value = texto;
    textoArea.style.display = "block";
    textoArea.select();
    document.execCommand("copy");
    textoArea.style.display = "none";

    mostrarAlerta();
  }

  function limparEscolhas() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    ["contato_condutor", "contato_responsavel", "acionamento_policial"].forEach((groupName) => {
      toggleOcorrencia1(groupName, `ocorrencia_${groupName.split("_")[1]}`);
    });

    ["nome_motorista", "numero_motorista", "nome_responsavel", "numero_responsavel", "nome_policial", "numero_policial", "ocorrencia_policial", "ocorrencia_motorista", "ocorrencia_responsavel", "restricao_text"].forEach((id) => {
      document.getElementById(id).value = "";
    });

    ["ocorrencia_motorista", "ocorrencia_responsavel", "ocorrencia_policial"].forEach((id) => {
      document.getElementById(id).style.display = "none";
    });
  }
  function toggleOcorrencia1(groupName, ocorrenciaId) {
    const checkboxes = document.getElementsByName(groupName);
    const ocorrencia = document.getElementById(ocorrenciaId);

    let showOcorrencia = false;
    for (const checkbox of checkboxes) {
      if (checkbox.checked && checkbox.value === "sim") {
        showOcorrencia = true;
        break;
      }
    }

    ocorrencia.style.display = showOcorrencia ? "block" : "none";
  }

  document.getElementById("gerarTexto_tab").addEventListener("click", gerarTexto);
  document.getElementById("limparEscolhas").addEventListener("click", limparEscolhas);
});
