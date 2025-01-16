// Função para alternar a exibição das opções extras
function toggleExtraOptions() {
  const extraOptions = document.getElementById("extra_options");
  const showExtraOptions = document.getElementById("show_extra_options");
  extraOptions.style.display = showExtraOptions.checked ? "block" : "none";
}

// Função para gerar a mensagem com base nas entradas
function gerarTexto() {
  const placa = document.getElementById("placa_ctt_resp").value.trim();
  const motorista = document.getElementById("mot_ctt_resp").value.trim();
  const localizacao = document.getElementById("loc_ctt_resp").value.trim();
  const situacao = document.getElementById("sit_ctt_resp").value;
  const situacaoExtra = document.getElementById("extra_option_list").value;
  const simCheckbox = document.getElementById("sim_ctt").checked;
  const naoCheckbox = document.getElementById("nao_ctt").checked;
  const ocorrencia = document.getElementById("ocorrencia_ctt_resp").value.trim();
  const plusAlert = document.getElementById("show_extra_options").checked;

  if (!placa || !motorista || !localizacao || !situacao) {
    alert("Por favor, preencha todos os campos obrigatórios e selecione uma situação.");
    return;
  }

  const frasesSituacao = {
    perda_prd: "esta com perda de sinal com o veículo rodando",
    perda_rdn: "esta com perda de sinal com o veículo parado",
    alert_dsg: "gerou alerta de desengate",
    abert_bau: "gerou alerta de abertura do baú",
    sens_bau: "gerou alerta de sensor do baú",
    conf_clt: `Notificamos que o Sr.(a) ${motorista} que esta com o veiculo ${placa}, informou macro de cliente / fim de viagem fora do ponto cadastrado em sua SM, confirma o local? \nSegue localização: ${localizacao}`,
    alert_jammer: "gerou alerta de jammer.",
    alert_bat: "gerou alerta de bateria violada",
    alert_ant: "gerou alerta de antena violada",
    alert_tec: "gerou alerta de teclado desconectado ou sem funcionamento",
    prd_ninf: "esta com parada não informada",
    tcl_bat: "gerou alerta de antena e teclado",
    chave_geral: `desligou a chave geral. Deste modo gerando alerta de Bateria, Antena e Teclado`,
    lcl_naut: `esta parado em local não autorizado`,
  };

  let texto = `Notificamos que o veículo ${placa}, que está com o Sr.(a) ${motorista}, ${frasesSituacao[situacao]}`;

  if (plusAlert) {
    texto += ` e também ${frasesSituacao[situacaoExtra]}`;
  }

  if (simCheckbox) {
    texto += `. Conseguimos contato com o motorista onde nos informou que ${ocorrencia}.`;
  } else if (naoCheckbox) {
    texto += `. Não conseguimos contato com o motorista. Deste modo, seguiremos com o plano de contingência até normalizar a situação.`;
  }

  texto += ` \nSegue localização: ${localizacao}`;

  if (situacao === "conf_clt") {
    texto = frasesSituacao["conf_clt"];
  }

  // Copiar para a área de transferência
  navigator.clipboard.writeText(texto)
    .then(() => {
      const alerta = document.getElementById("alerta");
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.opacity = "1";
      }, 10);

      setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => {
          alerta.style.display = "none";
        }, 500);
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar o texto: ", err);
    });
}

// Função para limpar o formulário
function limparFormulario() {
  //contato motorita
  document.getElementById("nome_motorista").value = "";
  document.getElementById("numero_motorista").value = "";
  document.getElementById("nome_responsavel").value = "";
  document.getElementById("numero_responsavel").value = "";
  document.getElementById("nome_policial").value = "";
  document.getElementById("numero_policial").value = "";
  document.getElementById("ocorrencia_policial").value = "";
  document.getElementById("ocorrencia_motorista").value = "";
  document.getElementById("ocorrencia_responsavel").value = "";
  document.getElementById("restricao_text").value = "";
  document.getElementById("sim_email").checked = false;
  document.getElementById("sim_resp").checked = false;
  document.getElementById("sim_policia").checked = false;
  toggleOcorrencia("sim_email", "ocorrencia_motorista");
  toggleOcorrencia("sim_resp", "ocorrencia_responsavel");
  toggleOcorrencia("sim_policia", "ocorrencia_policial");


  //contato reponsavel
  document.getElementById("sit_ctt_resp").value = "";
  document.getElementById("extra_option_list").value = "";
  document.getElementById("show_extra_options").checked = false;
  document.getElementById("extra_options").style.display = "none";
  document.getElementById("placa_ctt_resp").value = "";
  document.getElementById("mot_ctt_resp").value = "";
  document.getElementById("loc_ctt_resp").value = "";
  document.getElementById("sim_ctt").checked = false;
  document.getElementById("nao_ctt").checked = false;
  document.getElementById("ocorrencia_ctt_resp").value = "";
  toggleOcorrencia("sim_ctt", "ocorrencia_ctt_resp");

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  ["contato_condutor", "contato_responsavel", "acionamento_policial"].forEach((groupName) => {
    toggleOcorrencia1(groupName, `ocorrencia_${groupName.split("_")[1]}`);
  });

}

// Eventos de clique para limpar e gerar texto
document.getElementById("limparEscolhas_ctt").addEventListener("click", limparFormulario);
document.getElementById("limparEscolhas").addEventListener("click", limparFormulario)
document.getElementById("gerarTexto_ctt").addEventListener("click", gerarTexto);

// Função para alternar a exibição do campo de ocorrência
function toggleOcorrencia(groupName, ocorrenciaId) {
  const checkboxes = document.getElementsByName(groupName);
  const ocorrencia = document.getElementById(ocorrenciaId);

  let showOcorrencia = false;
  for (const checkbox of checkboxes) {
    if (checkbox.checked && checkbox.value === "sim") {
      showOcorrencia = true;
    } else if(checkbox.checked && checkbox.value === false){
      showOcorrencia = false;
    }
  }

  ocorrencia.style.display = showOcorrencia ? "block" : "none";
}

const fraseEmail = {

  perdaclt: "Notificamos que o veículo em questão está com perda de sinal em pátio de cliente/transportadora. Deste modo não seguiremos com o procedimento de contingência. Veículo não gerou alerta antes da perda. Todos os comandos cabíveis foram enviados ao veículo.",
  retirada: "Notificamos que o veículo em questão permanece sem o espelhamento para nossa central. Desta forma notificamos os responsáveis.",
  alerta: "o condutor do veículo em questão voltou a seguir viagem, encontra-se com sinal atualizado e segue a rota pré-estabelecida em sua solicitação de monitoramento, não gerou demais violações. Salientamos que a ocorrência policial foi devidamente finalizada.",
  sinal: "o veículo em questão voltou a posicionar em nosso sistema, segue a rota pré-estabelecida em sua solicitação de monitoramento e não gerou demais violações. Salientamos que a ocorrência olicial foi devidamente finalizada."

};

function copiarTexto(id){
  const texto = document.getElementById(id).innerText;
  navigator.clipboard.writeText(texto)
    .then(() => {
      const alerta = document.getElementById("alerta");
      alerta.style.display = "block";
      setTimeout(() => {
        alerta.style.opacity = "1";
      }, 10);

      setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => {
          alerta.style.display = "none";
        }, 500);
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar o texto: ", err);
    });
}