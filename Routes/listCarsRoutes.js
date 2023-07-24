const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Log = require('../models/Log');
const ConsumirAPI = 'http://api-test.bhut.com.br:3000/api/cars';
const axios = require('axios');
const amqp = require('amqplib');

router.get('/api/listCars', async (req, res) => {
    try {
      const response = await axios.get(ConsumirAPI);
      const carsData = response.data;
      res.json(carsData);
    } catch (error) {
      console.log('Falha a buscar carros na API.');
      res.status(500).json({ error: 'Ocorreu um erro ao buscar.' });
    }
  });
  
  async function sendToQueue(carData) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'car_queue';
  
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(carData)), {
      persistent: true,
    });
  
    console.log('Carro enviado para a fila RabbitMQ:', carData);
  
    await channel.close();
    await connection.close();
  }
  
  router.post('/api/createCar', async (req, res) => {
    try {
      const carData = req.body;
  
      // Criar o registro na API externa POST api/cars
      const response = await axios.post(ConsumirAPI, carData);
  
      // Salvar o log na coleção 'logs'
      const log = new Log({
        id: response.data.id,
        car_id: response.data.id,
      });
      await log.save();
  
      // Enviar o registro para a fila RabbitMQ
      await sendToQueue(response.data);
  
      // Enviar a resposta com os dados do carro criado
      res.status(201).json(response.data);
    } catch (error) {
      console.log('Falha ao criar carro na API externa.');
      res.status(500).json({ error: 'Ocorreu um erro ao criar carro.' });
    }
  });

  router.get('/api/logs', async (req, res) => {
    try {
      const logs = await Log.find().sort({ data_hora: -1 });
      res.json(logs);
    } catch (error) {
      console.log('Falha ao consultar os logs.');
      res.status(500).json({ error: 'Ocorreu um erro ao consultar os logs.' });
    }
  });

  module.exports = router;
