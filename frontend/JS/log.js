const logsListDiv = document.getElementById('logsList'); //referencia um id definido como logsList e manipulamos ele com o JS.

async function getLogs() { //Cria um função de receber e expor os logs de forma assicrona
  try { //enlaça os codigos em um bloco de codigos onde consegue definir sucesso e falhas.
    const response = await fetch('http://localhost:3000/api/logs'); //Aqui fazemos uma requisição usando a funçao fetch e o await para esperar a requisiçao ser concluida.
    const logs = await response.json(); //Aqui esperamos com o await que a resposta JSON seja concluida, a variavel log contera os dados que foram obtidos no servidor.

    let logsHTML = ''; 
    logs.forEach((log) => { //Aqui estamos percorrendo a array logs obtido da resposta JSON.
      //Aqui definimos para cada log estamos criando uma string HTML
      const logHTML = ` 
        <div class="log-item">
          <p><strong>Data e Hora:</strong> ${new Date(log.data_hora).toLocaleString()}</p>
        </div>
      `;
      logsHTML += logHTML; //A variavel logsHTML é usada para acumular todas as strings HTML geradas para cada log.
    });

    logsListDiv.innerHTML = logsHTML; //obtem o id do HTML e armazena a variavel logsHTML onde recebe todos os getlogs do banco de dados.
  } catch (error) { //Aqui retorna um erro caso nao foi possivel fazer a requisiçao get dos logs
    console.log('Falha ao buscar os logs:', error); //Aqui emite o tipo do erro no terminal.
    logsListDiv.innerHTML = '<p>Ocorreu um erro ao buscar os logs.</p>'; //Aqui expoe um texto no HTML para que o usuario consiga receber um feedback em caso de acertos ou nesse caso aqui um erro.
  }
}

getLogs(); //Inicia a funçao logs.
