const request = require('supertest');
const app = require('../index'); // Verifique se o caminho está correto
const mongoose = require('mongoose');
const Log = require('../models/Log');

// Defina a URI do banco de dados de teste
const testDBURI = 'mongodb+srv://joaovictorferreiramatias01:vitinhoma@teste.ijp3xcu.mongodb.net/?retryWrites=true&w=majority'; // Substitua pela URI correta

beforeAll(async () => {
  // Conectar ao banco de dados de teste antes de executar os testes
  await mongoose.connect(testDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Limpar a coleção de logs do banco de dados de teste após concluir os testes
  await Log.deleteMany({});
  // Fechar a conexão do banco de dados após concluir os testes
  await mongoose.connection.close();
});

describe('API endpoints', () => {
  it('should fetch a list of cars using GET /api/listCars', async () => {
    const response = await request(app).get('/api/listCars');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Adicione mais verificações nos dados de resposta, se necessário
  });

  it('should create a new car using POST /api/createCar', async () => {
    const carData = {
      title: "Civic",
      brand: "Honda",
      price: "100.000",
      age: 2020,
    };

    try {
      const response = await request(app).post('/api/createCar').send(carData);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      // Adicione mais verificações nos dados de resposta, se necessário

      // Verifique se a entrada de log foi criada no banco de dados
      const logEntry = await Log.findOne({ car_id: response.body.id });
      expect(logEntry).toBeDefined();
    } catch (error) {
      // Registre detalhes do erro para auxiliar na depuração
      console.error('Error:', error);
      throw error;
    }
  });

  it('should fetch the logs using GET /api/logs', async () => {
    const response = await request(app).get('/api/logs');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Adicione mais verificações nos dados de resposta, se necessário
  });
});
