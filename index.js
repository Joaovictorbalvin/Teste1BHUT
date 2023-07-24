const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const listCarsRoutes = require('./Routes/listCarsRoutes');
const app = express();
const port = 3000;

require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

require('./models/Log');
require('./db');

const httpServer = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(listCarsRoutes);

httpServer.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app;