// test/db.test.js

const mongoose = require('mongoose');
const db = require('../db');

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

// Mock the resolved value when calling mongoose.connect
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
}));

describe('Database Connection', () => {
  afterEach(() => {
    // Reset the mock after each test
    jest.clearAllMocks();
  });

  it('should establish a database connection', async () => {
    // Call the function that establishes the connection
    await db.connectToDatabase();

    // Verify that mongoose.connect was called with the correct URI and options
    expect(mongoose.connect).toHaveBeenCalledWith(db.mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Verify that the console.log statement is called
    expect(console.log).toHaveBeenCalledWith('Conexão para o banco de dados estabelecida.');
  });

  it('should handle connection errors', async () => {
    // Mock the rejected value when calling mongoose.connect
    const mockRejectedValue = new Error('Mocked Error');
    mongoose.connect.mockRejectedValue(mockRejectedValue);

    // Call the function that establishes the connection
    await db.connectToDatabase();

    // Verify that mongoose.connect was called with the correct URI and options
    expect(mongoose.connect).toHaveBeenCalledWith(db.mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Verify that the console.error statement is called with the error message
    expect(console.error).toHaveBeenCalledWith('Erro ao conectar ao banco de dados: ', mockRejectedValue);
  });
});
