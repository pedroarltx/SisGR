// Botão de limpar bloco de notas
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('notes').value = ''; // Limpa o conteúdo
  });
  
  // Botão de copiar bloco de notas
  document.getElementById('copyButton').addEventListener('click', function() {
    const textarea = document.getElementById('notes');
    
    // Seleciona o conteúdo e foca no campo
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Para dispositivos móveis
    
    // Verifica se a API Clipboard está disponível
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textarea.value).then(() => {
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
      }).catch(err => {
        console.error('Erro ao copiar o texto:', err);
        alert('Falha ao copiar o texto!');
      });
    } else {
      // Caso a API Clipboard não esteja disponível, tentamos usar o método antigo
      try {
        document.execCommand('copy'); // Método antigo (não recomendado)
        alert('Texto copiado com sucesso!');
      } catch (err) {
        console.error('Erro ao tentar usar execCommand:', err);
        alert('Falha ao copiar o texto!');
      }
    }
  });
  