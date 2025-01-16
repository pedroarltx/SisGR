document.addEventListener("DOMContentLoaded", () => {

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

  document.getElementById("gerarTexto_tab").addEventListener("click", gerarTexto);
  document.getElementById("limparEscolhas").addEventListener("click", limparEscolhas);
});
