async function main() {
    const csvData = await loadCSV('/public/csv/GasStation.csv'); // Verifique o caminho do arquivo CSV
    const searchInput = document.getElementById('searchInput');

    // Evento para filtrar os resultados conforme o usuário digita
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim(); // Obtém o valor digitado pelo usuário
        const filteredData = filterResults(csvData, query); // Filtra os dados com base na consulta
        updateTable(filteredData); // Atualiza a tabela com os resultados filtrados
    });

    // Inicializa a tabela com todos os dados disponíveis no início
    updateTable(csvData);
}



async function loadCSV(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo CSV. Status: ${response.status}`);
        }

        const data = await response.text();

        // Processa as linhas do CSV, ignorando a primeira linha (cabeçalho) e linhas inválidas ou mal formatadas
        const rows = data.split('\n').slice(1).filter(row => {
            const columns = row.split(',').map(col => col.trim()); // Remove espaços extras
            return columns.length === 3 && columns.every(col => col !== '' && col !== '----'); // Garante que todos os campos sejam válidos
        });

        // Mapeia as linhas para um objeto estruturado
        return rows.map(row => {
            const [cidade, posto, telefone] = row.split(',').map(item => item.trim());
            return { cidade, posto, telefone };
        });
    } catch (error) {
        console.error('Erro ao carregar o CSV:', error);
        alert(`Não foi possível carregar os dados. Detalhes do erro: ${error.message}`); // Exibe o erro para o usuário
        return [];
    }
}

// Função para filtrar os dados de acordo com a pesquisa
function filterResults(data, query) {
    const lowerCaseQuery = query.toLowerCase();
    return data.filter(item =>
        item.cidade.toLowerCase().includes(lowerCaseQuery) ||
        item.posto.toLowerCase().includes(lowerCaseQuery)
    );
}

// Função para atualizar a tabela com os dados filtrados
function updateTable(data) {
    const tableBody = document.querySelector('#resultTable tbody');
    const resultTable = document.getElementById('resultTable');
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

    if (data.length === 0) {
        // Se não houver resultados, exibe a mensagem de "Nenhum resultado encontrado"
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="3">Nenhum resultado encontrado.</td>`;
        tableBody.appendChild(row);
        resultTable.style.display = 'table'; // Garante que a tabela seja exibida
        return;
    }

    // Preenche a tabela com os dados filtrados
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.cidade}</td>
            <td>${item.posto}</td>
            <td>${item.telefone}</td>
        `;
        tableBody.appendChild(row);
    });

    resultTable.style.display = 'table'; // Exibe a tabela
}


// Chama a função principal assim que o DOM for carregado
document.addEventListener('DOMContentLoaded', main);
