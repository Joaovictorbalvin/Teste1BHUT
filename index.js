const express = require('express'); //Biblioteca do Node
const cors = require('cors'); //Biblioteca cors
const bodyParser = require('body-parser'); //Biblioteca body-parser
const { createServer } = require('http'); //Biblioteca HTTP
const listCarsRoutes = require('./src/Routes/CarsRoutes'); //Importei o listCarsRoutes onde fica as API endpoints.
const app = express(); //Essa variavel ficara responsavel de armazenar a instancia express a partir dai conseguimos configurar o servidor com a variavel app.
const port = 3000; //Defini uma porta onde o servidor sera executado para o estado de online

require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

require('./src/models/Log'); //Carregar a estrutura log definido no banco de dados
require('./src/database/db'); //Aqui mostrara se o banco de dados esta conectado quando executar o server.

const httpServer = createServer(app); //usnado a funçao createserver criamos o servidor HTTP, passamos a instancia app como argumento para conseguir lidar com as requisiçoes.

app.use(cors()); //Permite que os clientes façam requisiçoes em diferentes origens ao servidor, por exemplo um site se comunicar com o servidor.
app.use(bodyParser.json());//Isso permite que o servidor manipule os dados enviados pelo cliente no formato JSON.
app.use(listCarsRoutes); // Isso define que todas as Endpoint do routes serao acessiveis pelo servidor.

httpServer.listen(port, () => { //Nesta linha iniciamos o servidor HTTP para escutar na porta definida.
  console.log("Server esta sendo executado na porta " + port); //Quando o servidor está em execução ele imprime esse log no terminal.
});

module.exports = app; //Exporta o app para que ela consiga ser usadas em outras partes do codigo.