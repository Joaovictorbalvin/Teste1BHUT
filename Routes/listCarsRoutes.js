const express = require('express'); //Biblioteca do node.
const router = express.Router(); // Cria um objeto Router para definir rotas modulares no aplicativo.
const mongoose = require('mongoose'); //Biblioteca do MongoDB
const Log = require('../models/Log'); //importação da estrutura do Banco de dados LOG
const ConsumirAPI = 'http://api-test.bhut.com.br:3000/api/cars'; //variavel da API externa a ser consumida
const axios = require('axios'); //Biblioteca para lidar com api Externas
const amqp = require('amqplib'); // Biblioteca do amqp

router.get('/api/listCars', async (req, res) => { //Aqui definimos uma rota para o HTTP get com o caminho /api/listCards
    try { //para envolver o codigo e lançar conexoes.
      const response = await axios.get(ConsumirAPI); //Aqui criamos uma variavel response para armazenar a resposta da API, usamos a biblioteca axios para fazer uma chamada HTTP
      const carsData = response.data; //Aqui extraimos os dados da resposta da API
      res.json(carsData); //Respondemos a solicitaçoes do cliente.
    } catch (error) { //Se ocorrer algum erro do codigo try, passara para o catch
      console.log('Falha a buscar carros na API.'); //Aqui exibimos o tipo do erro no terminal.
      res.status(500).json({ error: 'Ocorreu um erro ao buscar.' }); //Em caso de erro ao contrario do que acontece no Try, aqui a acontece que respondemos a solicitaçao do cliente com o erro.
    }
  });
  
  router.post('/api/createCar', async (req, res) => { //Aqui definimos uma rota para o HTTP post com o caminho /api/createCars
    try {
      const carData = req.body; //req um obejto que resepresenta a solicitaçao HTTP, aqui usamos a variavel const para armazenar dados extraidos no corpo, isso permite que o servidor salve no banco de dados esse dados, processe informaçoes ou responde solicitações.
    
      const response = await axios.post(ConsumirAPI, carData);   // Criar o registro na API externa POST api/cars
  
      const log = new Log({ // Salvar o log na coleção 'logs' do mongoDB
        id: response.data.id, //Salva a id da data
        car_id: response.data.id, //Salva o id do carro
      });
      await log.save(); //Aqui usamos await para esperar ser concluido o save log para progresseguir
  
      await sendToQueue(response.data); // Enviar o registro para a fila RabbitMQ
  
      res.status(201).json(response.data);  // Enviar a resposta com os dados do carro criado para o servidor.
    } catch (error) { //Em caso de erro no try, catch lidara com esses problemas da requisição.
      console.log('Falha ao criar carro na API externa.');  //Aqui exibimos o tipo do erro no terminal.
      res.status(500).json({ error: 'Ocorreu um erro ao criar carro.' }); //Em caso de erro ao contrario do que acontece no Try, aqui a acontece que respondemos a solicitaçao do cliente com o erro.
    }
  });

  async function sendToQueue(carData) { //funçao assicrona para o sentTQueue que recebera o parametro data que sao criadas na API createCar.
    const connection = await amqp.connect('amqp://localhost'); //Aqui estamos estabelecendo uma conexao com o servidor local usando a biblioteca amqp, await para aguardar a conexão ser estabelecida antes de prosseguir.
    const channel = await connection.createChannel(); //aqui estamos criando um canal de conexao entre o cliente e o servidor RabbitMQ
    const queueName = 'car_queue'; //Aqui estamos definindo o nome da fila.
  
    await channel.assertQueue(queueName, { durable: true }); //estamos usando o canal para declarar a fila com o nome car_queue, o durable true indica que a fila deve ser duravel para sobreviver em caso reinicialização.
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(carData)), { //Aqui estamos enviando os dados carData que sao convertidos em string jSON, o parametro persistent true indica que as mensagem devem ser enviadas par afilam para que nao sejam perdidas em caso de falha no servidor.
      persistent: true,
    });
  
    console.log('Carro enviado para a fila RabbitMQ:', carData); //Imprime um envio de dados para fila do RabbitMQ no terminal. 
  
    await channel.close(); //Estamos fechando o canal aqui  apos o envio dos dados para a fila.
    await connection.close();  //Estamos fechando o connection aqui  apos o envio dos dados para a fila.
  }
  

  router.get('/api/logs', async (req, res) => { //Aqui definimos uma rota para o HTTP get com o caminho /api/logs
    try { //para envolver o codigo e lançar conexoes.
      const logs = await Log.find().sort({ data_hora: -1 }); //Criei um variavel logs para armazenar os Logs encontrados no MongoDB, Log.Find para encontrar esse registros, .sort para colocar ele em ordem decrescente.
      res.json(logs); //Usamos a funçao json() do objeto res para enviar os registros logs como resposta para a solicitaçao que é enviado para o cliente.
    } catch (error) { //Em caso de erro no try, catch lidara com esses problemas da requisição.
      console.log('Falha ao consultar os logs.'); //Aqui exibimos o tipo do erro no terminal. 
      res.status(500).json({ error: 'Ocorreu um erro ao consultar os logs.' }); //Em caso de erro ao contrario do que acontece no Try, aqui a acontece que respondemos a solicitaçao do cliente com o erro.
    }
  });

  module.exports = router;
