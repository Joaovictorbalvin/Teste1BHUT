const mongoose = require('mongoose'); //Biblioteca do MongoDB
const Log = require('../src/models/Log'); //Importa a estrutura do Mongodb

describe('Log Model', () => { //Aqui um argumento string que descreve o que esta sendo testado, dentro desse bloco sera executado varios testes.
  beforeAll(async () => { //permite executar um bloco de codigos antes de todos os testes serem iniciados.
    await mongoose.connect('mongodb+srv://joaovictorferreiramatias01:vitinhoma@teste.ijp3xcu.mongodb.net/?retryWrites=true&w=majority', { //Conecta o mongoDB por meio da URL
      useNewUrlParser: true,
      useUnifiedTopology: true, //opções recomendadas pela mongoDB
    });
  });

  afterAll(async () => { //permite executar um bloco de codigos depois de todos os testes serem finalizados.
    await mongoose.connection.close(); //Fecha a conexão do mongoDB depois do teste ser concluido
  });

  afterEach(async () => { //permite executar um bloco de codigos depois de todos os testes serem finalizados.
    await Log.deleteMany({}); //Deleta todos os Log testes depois de serem concluidos.
  });

  it('deve criar uma nova instância de log', async () => { //Aqui definimos o primeiro argumento de teste.

    const data = { //Criar alguns dados de exemplo.
      id: '123',
      data_hora: new Date('2023-07-23T12:34:56'),
      car_id: '456',
    };

    const log = new Log(data); //Criar uma nova instância de Log usando o construtor do modelo

    await log.save(); //Salvar a instância de log

    const savedLog = await Log.findOne({ id: data.id }); //Localizar o log salvo no banco de dados

    expect(savedLog).toBeInstanceOf(Log); //verifica se o objeto chamado savedLog e um log valido seguindo a estrutura esperado para o registro se for valido passa no teste se for invalido falha no teste.

    expect(savedLog.id).toBe(data.id); //verifica se a id do log salvo no banco de dados e igual ao id do objeto data.
    expect(savedLog.data_hora.toISOString()).toBe(data.data_hora.toISOString()); //verifica se a data_hora do log salvo no banco de dados e igual a data_hora do objeto data
    expect(savedLog.car_id).toBe(data.car_id); //verifica se o car_id do log salvo no banco de dados e igual a car_id do objeto data.
  });

  it('deve ter um valor padrão para data_hora', async () => { //Aqui definimos o primeiro argumento de teste.
    const dataWithoutDate = { //Criar alguns dados de exemplo sem especificar a propriedade data_hora
      id: '123',
      car_id: '456',
    };

    const log = new Log(dataWithoutDate); //Criar uma nova instância de log sem especificar a propriedade data_hora.

    await log.save(); // //Salvar a instância de log

    const savedLog = await Log.findOne({ id: dataWithoutDate.id }); //Localizar o log salvo no banco de dados

    expect(savedLog.data_hora).toEqual(expect.any(Date)); //Verifique se a propriedade data_hora está definida como o valor padrão (Date.now())
  });
});
