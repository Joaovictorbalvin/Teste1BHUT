const logsListDiv = document.getElementById('logsList');

async function getLogs() {
  try {
    const response = await fetch('http://localhost:3000/api/logs');
    const logs = await response.json();

    let logsHTML = '';
    logs.forEach((log) => {
      const logHTML = `
        <div class="log-item">
          <p><strong>Data e Hora:</strong> ${new Date(log.data_hora).toLocaleString()}</p>
        </div>
      `;
      logsHTML += logHTML;
    });

    logsListDiv.innerHTML = logsHTML;
  } catch (error) {
    console.log('Falha ao buscar os logs:', error);
    logsListDiv.innerHTML = '<p>Ocorreu um erro ao buscar os logs.</p>';
  }
}

getLogs();
