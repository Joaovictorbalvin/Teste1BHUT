// db.js

const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBURI = process.env.mongo_URL;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão para o banco de dados estabelecida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados: ', error);
  }
};

module.exports = { connectToDatabase, mongoDBURI };
