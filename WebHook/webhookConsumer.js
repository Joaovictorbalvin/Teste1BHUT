const amqp = require('amqplib');
const axios = require('axios');

const queueName = 'car_queue';
const webhookUrl = 'http://api-test.bhut.com.br:3000/api/cars';

async function consumeFromQueue() {
  // Conexão com o RabbitMQ
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);

  console.log('Aguardando mensagens da fila...');

  // Consumir mensagens da fila
  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const carData = JSON.parse(message.content.toString());
      console.log('Recebido da fila RabbitMQ:', carData);

      try {
        // Enviar o webhook para a URL do serviço externo (API)
        await axios.post(webhookUrl, carData);
        console.log('Webhook enviado:', carData);

        // Confirmação de que a mensagem foi processada com sucesso
        channel.ack(message);
      } catch (error) {
        console.error('Erro ao enviar o webhook:', error.message);
        // Rejeitar a mensagem para tentar novamente após um tempo
        channel.nack(message);
      }
    }
  });
}

consumeFromQueue().catch((err) => {
  console.error('Erro ao consumir a fila RabbitMQ:', err);
});
