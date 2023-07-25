const amqp = require('amqplib'); //Aqui usamos a Biblioteca amqplib
const axios = require('axios'); //Aqui usamos a biblioteca axios para lidar com API Externas.

const queueName = 'car_queue'; //Nome da fila
const webhookUrl = 'http://api-test.bhut.com.br:3000/api/cars'; //URL de serviço externo para onde enviaremos os dados dos carros.

async function consumeFromQueue() { //função assicrona essa função sera responsavel pelo envio de dados dos carros para o serviço externo (API).

  const connection = await amqp.connect('amqp://localhost'); //Criando a conexao com o RabbitMQ
  const channel = await connection.createChannel(); //criando o canal, await para esperar que o processo seja finalizado para progresseguir.

  await channel.assertQueue(queueName, { durable: true });  //declarar fila no RabbitMQ indica que queremos uma fila duravel sobrevivera a reinicilizações do servidor.
  channel.prefetch(1); //So solicitara uma mensagem da fila por vez, evitando numeros grandes de mensagens.

  console.log('Aguardando mensagens da fila...'); //Imprime um log no terminal para mostrar onde o processo esta.

  channel.consume(queueName, async (message) => {
    if (message !== null) { //Verificaçao se a mensagem nao e nula
      const carData = JSON.parse(message.content.toString()); //convertemos o conteudo da mensagem em um objeto JavaScript
      console.log('Recebido da fila RabbitMQ:', carData); //Imrpime um log no terminal para mostrar onde o processo esta. Um feedback que foi realizado com sucesso tal tarefa

      try {//Try para envolver o codigo em um bloco de codigods
       
        await axios.post(webhookUrl, carData); // Enviar o webhook para a URL do serviço externo (API)
        console.log('Webhook enviado:', carData); //Imrpime um log no terminal para mostrar onde o processo esta. Um feedback que foi realizado com sucesso tal tarefa.

        
        channel.ack(message); // Confirmação de que a mensagem foi processada com sucesso
      } catch (error) { //Catch para lidar com erros.
        console.error('Erro ao enviar o webhook:', error.message); //Imrpime um log no terminal para mostrar onde o processo esta. Um feedback que foi realizado com falhas tal tarefa.
       
        channel.nack(message); // Rejeitar a mensagem para tentar novamente após um tempo
      }
    }
  });
}

consumeFromQueue().catch((err) => { //Lida com o erro da funçao  consumeFromQueue em caso de erro ao consumir a fila.
  console.error('Erro ao consumir a fila RabbitMQ:', err); //Imrpime um log no terminal para mostrar onde o processo esta. Um feedback que foi realizado com falhas tal tarefa
});
