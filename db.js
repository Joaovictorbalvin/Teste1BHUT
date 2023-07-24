const mongoose = require('mongoose'); //Biblioteca do mongoDB
require('dotenv').config(); //config do .env onde tem declarado a url do mongoDB


mongoose.connect(process.env.mongo_URL).then( //then define um bloco de codigos onde em caso de sucesso retorna um log, aqui estamos conectando o servidor ao banco de dados o endereço é obtido no .env.
    () => {
        console.log('Conectado ao banco de dados');//Aqui imprimimos que foi conectado com sucesso
    }
).catch((err) => { //Aqui usamos o catch para manipular em caso de erro na conexão.
    console.log('Erro ao conectar no banco de dados ' + err); //Aqui imprimimos no terminal que existe um erro ao conectar no banco de dados.
})
