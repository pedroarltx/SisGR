document.addEventListener('DOMContentLoaded', () => {
    // Função para copiar o conteúdo de um parágrafo
    function copiarTexto(id) {
        const paragrafo = document.getElementById(id);
        const textarea = document.createElement("textarea");
        textarea.value = paragrafo.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
  
        // Mostrar mensagem de "Texto copiado"
        const alerta = document.getElementById('alerta');
        alerta.style.display = 'block';
        alerta.style.opacity = '1';
  
        // Ocultar o alerta após 2 segundos
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500); // Tempo para a animação de desaparecimento
        }, 2000);
    }
  
    // Função para gerar o texto com base nos inputs
    document.getElementById('gerarTexto_tab').addEventListener('click', () => {
        let texto = "";
  
        // Contato com o condutor
        const nomeMotorista = document.getElementById('nome_motorista').value.trim();
        const numeroMotorista = document.getElementById('numero_motorista').value.trim();
        const contatoCondutor = document.querySelector('input[name="contato_condutor"]:checked');
        const ocorrenciaMotorista = document.getElementById('ocorrencia_motorista').value.trim();
        if (contatoCondutor) {
            if (contatoCondutor.value === 'sim') {
                texto += `Em contato com o Sr. ${nomeMotorista} (motorista), pelo telefone ${numeroMotorista}, onde nos informou que ${ocorrenciaMotorista}. Todos os comandos cabíveis foram enviados ao veículo. `;
            } else if (contatoCondutor.value === 'nao') {
                texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
            } else if (contatoCondutor.value === 'inexistente_mot') {
                texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém o número consta como inexistente ou fora de área. `;
            }
        }
  
        // Contato com o responsável
        const nomeResponsavel = document.getElementById('nome_responsavel').value.trim();
        const numeroResponsavel = document.getElementById('numero_responsavel').value.trim();
        const contatoResponsavel = document.querySelector('input[name="contato_responsavel"]:checked');
        const ocorrenciaResponsavel = document.getElementById('ocorrencia_responsavel').value.trim();
        if (contatoResponsavel) {
            if (contatoResponsavel.value === 'sim') {
                texto += `Efetuamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, onde nos informou que ${ocorrenciaResponsavel}, sendo assim o notificamos que seguiremos com o procedimento de contingência até normalizar a situação. `;
            } else if (contatoResponsavel.value === 'nao') {
                texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
            } else if (contatoResponsavel.value === 'inexistente_resp') {
                texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém o número consta como inexistente ou fora de área. `;
            }
        }
  
        // Contato com o responsável via grupo
        const transportadoras = document.querySelector('input[name="contato_responsavel_grupo"]:checked');
        if (transportadoras) {
            if (transportadoras.value === "Qbox") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Qbox - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "Otimiza") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Otimiza - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "Adege") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Adege - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "GVM") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp GVM - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "jvtrans") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp JV Transportes - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "Rapido_parana") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Rápido Paraná - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "Bull_log") {
                texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Bull Log - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
            } else if (transportadoras.value === "restricao") {
                // Obtém o horário inserido no campo de texto "restricao_text"
                const restricaoHorario = document.getElementById('restricao_text').value.trim();
                // Verifica se o horário foi inserido e o inclui no texto
                if (restricaoHorario) {
                    texto += `Como descrito em PRG não podemos entrar em contato com o responsável via ligação após ${restricaoHorario} horas, deste modo seguiremos o acionamento policial.`;
                }
            }
        }

  
        // Contato com a polícia
        const nomePolicial = document.getElementById('nome_policial').value.trim();
        const numeroPolicial = document.getElementById('numero_policial').value.trim();
        const acionamentoPolicial = document.querySelector('input[name="acionamento_policial"]:checked');
        const ocorrencia_policial = document.getElementById('ocorrencia_policial').value.trim();
        if (acionamentoPolicial) {
            if (acionamentoPolicial.value === 'sim') {
                texto += `Sendo assim, seguiremos com o procedimento de contingência onde efetuamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, onde fomos atendidos pelo Sr. ${ocorrencia_policial}, e o deixamos ciente da situação. Segue nossa proposta de pronta resposta: `;
            } else if(acionamentoPolicial.value ==='nao') {
                texto += `Sendo assim, seguimos com o procedimento de contingência onde tentamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, mas a ligação é direcionada para caixa postal. Segue nossa proposta de pronta resposta: `;
            } else if (acionamentoPolicial.value ==='Continuidade'){
                texto += "Sendo assim, manteremos o acionamento policial ativo até normalizar a situação. Segue nossa proposta de pronta resposta:";
            }
        }
  
        // Exibir o texto gerado na textarea (escondida)
        const textoArea = document.getElementById('textoGerado');
        textoArea.value = texto.trim();
  
        // Copiar o texto gerado
        textoArea.style.display = 'block'; // Mostra temporariamente a textarea para copiar
        textoArea.select();
        document.execCommand('copy');
        textoArea.style.display = 'none'; // Esconde novamente a textarea
  
        // Mostrar o alerta
        const alerta = document.getElementById('alerta');
        alerta.style.display = 'block';
        alerta.style.opacity = '1';
  
        // Ocultar o alerta após 2 segundos
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 300); // Tempo para a animação de desaparecimento
        }, 2000);
    });
  
    // Função para limpar as escolhas
    document.getElementById('limparEscolhas').addEventListener('click', () => {
        // Limpar todos os inputs de radio
        const radio = document.querySelectorAll('input[type="radio"]');
        radio.forEach(radio => {
            radio.checked = false; // Desmarcar todos os radios
        });
      toggleOcorrencia1('contato_condutor', 'ocorrencia_motorista');  // Atualiza o campo do condutor
      toggleOcorrencia1('contato_responsavel', 'ocorrencia_responsavel');  // Atualiza o campo do responsável
      toggleOcorrencia1('acionamento_policial', 'ocorrencia_policial');  // Atualiza o campo da ocorrência policial
      
        // Limpar os campos de texto
        document.getElementById('nome_motorista').value = '';
        document.getElementById('numero_motorista').value = '';
        document.getElementById('nome_responsavel').value = '';
        document.getElementById('numero_responsavel').value = '';
        document.getElementById('nome_policial').value = '';
        document.getElementById('numero_policial').value = '';
        document.getElementById('ocorrencia_policial').value = '';      
        document.getElementById('ocorrencia_motorista').value = '';
        document.getElementById('ocorrencia_responsavel').value = '';
        document.getElementById('ocorrencia_motorista').style.display = 'none';
        document.getElementById('ocorrencia_responsavel').style.display = 'none';
        document.getElementById('ocorrencia_policial').style.display = 'none';
        document.getElementById('restricao_text').value = '';
    });
  });
  
  //Botoa de copiar All
  function copiarTexto(id) {
      const paragrafo = document.getElementById(id);
      const textarea = document.createElement("textarea");
      textarea.value = paragrafo.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      
      // Mostra a mensagem de alerta
      const alerta = document.getElementById('alerta');
      alerta.style.display = 'block';
      alerta.style.opacity = '1';
      
      // Oculta a mensagem após 2 segundos
      setTimeout(() => {
          alerta.style.opacity = '0';
          setTimeout(() => {
              alerta.style.display = 'none';
          }, 500); // Tempo para a animação de desaparecimento
      }, 2000);
  }
  
  function toggleOcorrencia1(groupName, ocorrenciaId) {
    const radios = document.getElementsByName(groupName);
    const ocorrencia = document.getElementById(ocorrenciaId);

    // Verifica se o radio com valor 'sim' está selecionado
    let showOcorrencia = false;
    for (const radio of radios) {
        if (radio.checked && radio.value === 'sim') {
            showOcorrencia = true;
            break;
        }
    }

    // Exibe ou oculta o textarea conforme o valor de showOcorrencia
    ocorrencia.style.display = showOcorrencia ? 'block' : 'none';
}

