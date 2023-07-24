const mongoose = require("mongoose"); //Biblioteca do mongoDB

const logSchema = new mongoose.Schema({ //Esquema no mongoDB uam descriçao de estrutura de dados que sera armazenada no banco de dados.
  id: { //Um campo id do tipo String
    type: String 
  },
  data_hora: {  //Um compo data_hora do tipo data
    type: Date, 
    default: Date.now //se não for fornecida uma data e hora ao criar um registro de log, ele será definido com o valor atual do servidor.
  },
  car_id: { //car_id do tipo String que e o identificador unico do carro.
    type: String 
  }
});

const Log = mongoose.model('Log', logSchema); //Criando o modelo Log com base no modelo de esquema logSchema para que as estruturas possam ser manipuladas.

module.exports = Log; //Exporta o modelo Log para que possa ser usado no servidor.
