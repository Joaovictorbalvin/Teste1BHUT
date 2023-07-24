const request = require('supertest'); //Biblioteca do jest
const app = require('../index'); //Define o caminho do servidor 
const mongoose = require('mongoose'); //Bibilioteca do mongodb
const Log = require('../models/Log'); //Importa a estrutura usada para armazenamento de logs

const testDBURI = 'mongodb+srv://joaovictorferreiramatias01:vitinhoma@teste.ijp3xcu.mongodb.net/?retryWrites=true&w=majority'; //Conecta o mongoDB por meio da URL

beforeAll(async () => { //permite executar um bloco de codigos antes de todos os testes serem iniciados.
 
  await mongoose.connect(testDBURI, { //Faz uma conexão com o banco de dados e aponta para um banco de dados teste para nao afetar os dados de produçao
    useNewUrlParser: true,
    useUnifiedTopology: true, //opções recomendadas pela mongoDB
  });
});

afterAll(async () => { //permite executar um bloco de codigos depois de todos os testes serem iniciados.
  await Log.deleteMany({}); // Limpar a coleção de logs do banco de dados de teste após concluir os testes
  await mongoose.connection.close(); // Fechar a conexão do banco de dados após concluir os testes
});

describe('API endpoints', () => { //Aqui um argumento string que descreve o que esta sendo testado, dentro desse bloco sera executado varios testes.
  it('deve buscar uma lista de carros usando GET /api/listCars', async () => { //Definimos aqui o que esta sendo testado como o primeiro argumento
    const response = await request(app).get('/api/listCars'); //Dentro desse teste, estou fazendo a requisição Get para o endpoint usando a biblioteca 'request(app)'
    expect(response.status).toBe(200); //Depois de receber a resposta da requisiçãom estamos verificando se a reposta possui o status 200 ok com o expect().
    expect(response.body).toBeDefined(); //e se o corpo da resposta nao for definido retorna uma reposta valida em um corpo definido.
   
  });

  it('deve criar um novo carro usando POST /api/createCar', async () => { //Definimos aqui o que esta sendo testado como o segundo argumento
    const carData = { //Data do carro para realizar o POST na hora de criar o carro
      title: "Civic", //Aqui definimos um modelo.
      brand: "Honda", //Aqui definimos um band.
      price: "100.000", //Aqui definimos um price.
      age: 2020, //Aqui definimos um age.
    };

    try {
      const response = await request(app).post('/api/createCar').send(carData); //usamos a funçao request(app).send para fazer um requisição POST com os dados dos carro para o Endpoint.

      expect(response.status).toBe(201); //usamos uma asserções para verificar o status da resposta 201.
      expect(response.body).toBeDefined(); //se o corpo da resposta nao for definido retorna uma reposta valida em um corpo definido.
     
      const logEntry = await Log.findOne({ car_id: response.body.id });   // Verifique se a entrada de log foi criada no banco de dados
      expect(logEntry).toBeDefined(); //Se a entrada do log for encontrada sera definido uma asserção verdadeira.
    } catch (error) { //Caso de erro na requisiçao ou log nao e encontrado no Banco de dados, o bloco catch exibira a mensagem de erro no console.
      console.error('Error:', error); //Indica o erro que aconteceu.
      throw error;
    }
  });

  it('deve buscar os logs usando GET /api/logs', async () => { //Definimos aqui o que esta sendo testado como o terceiro argumento.
    const response = await request(app).get('/api/logs'); //Dentro desse teste, estou fazendo a requisição Get para o endpoint usando a biblioteca 'request(app)'
    expect(response.status).toBe(200); //Depois de receber a resposta da requisiçãom estamos verificando se a reposta possui o status 200 ok com o expect().
    expect(response.body).toBeDefined(); //e se o corpo da resposta nao for definido retorna uma reposta valida em um corpo definido.
  });
});
