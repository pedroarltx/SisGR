// Função para copiar os dados da tabela para a área de transferência
document.getElementById("copiarTabela").addEventListener("click", function() {
    const placa = document.getElementById("Placa").value;
    const carreta = document.getElementById("Carreta").value;
    const motorista = document.getElementById("Motorista").value;
    const operacao = document.getElementById("Operação").value;
    const carga = document.getElementById("Carga").value;
    const localizacao = document.getElementById("Localização").value;
    const situacao = document.getElementById("Situação").value;
    const ocorrencia = document.getElementById("Ocorrência").value;
  
    const tabelaTexto = `Placa: ${placa}\nCarreta: ${carreta}\nMotorista: ${motorista}\nOperação: ${operacao}\nCarga: ${carga}\nLocalização: ${localizacao}\nSituação: ${situacao}\nOcorrência: ${ocorrencia}`;
  
    // Cria um campo de input temporário para copiar o conteúdo
    const tempInput = document.createElement("textarea");
    tempInput.value = tabelaTexto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  
    // Exibir um alerta informando que o texto foi copiado
    const alerta = document.getElementById('alerta');
    alerta.style.display = 'block';
    alerta.style.opacity = '1';
  
    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 500);
    }, 2000);
  });
  
  // Função para limpar os campos do formulário
  document.getElementById("clearButton1").addEventListener("click", function() {
    document.getElementById("Placa").value = "";
    document.getElementById("Carreta").value = "";
    document.getElementById("Motorista").value = "";
    document.getElementById("Operação").value = "";
    document.getElementById("Carga").value = "";
    document.getElementById("Localização").value = "";
    document.getElementById("Situação").value = "";
    document.getElementById("Ocorrência").value = "";
  
    // Não é necessário copiar texto quando limpar o formulário
    // Se quiser mostrar um alerta ao limpar o formulário, faça aqui
    const alertaLimpeza = document.getElementById('alerta');
    alertaLimpeza.innerText = 'Campos Limpos!';
    alertaLimpeza.style.backgroundColor = '#dc3545'; // Exemplo de cor para o alerta de limpeza
    alertaLimpeza.style.display = 'block';
    alertaLimpeza.style.opacity = '1';
  
    setTimeout(() => {
        alertaLimpeza.style.opacity = '0';
        setTimeout(() => {
            alertaLimpeza.style.display = 'none';
        }, 500);
    }, 2000);
  });
  
  
  function copiarTexto(texto){
    // Cria um campo de input temporário para copiar o conteúdo
    const tempInput = document.createElement("textarea");
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  
    // Exibir um alerta informando que o texto foi copiado
    const alerta = document.getElementById('alerta');
    alerta.style.display = 'block';
    alerta.style.opacity = '1';
  
    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 500);
    }, 2000);
  }