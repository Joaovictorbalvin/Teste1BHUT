// log.test.js

const mongoose = require('mongoose');
const Log = require('../models/Log');

describe('Log Model', () => {
  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb+srv://joaovictorferreiramatias01:vitinhoma@teste.ijp3xcu.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests are completed
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Remove all documents from the Log collection after each test
    await Log.deleteMany({});
  });

  it('should create a new Log instance', async () => {
    // Create some sample data
    const data = {
      id: '123',
      data_hora: new Date('2023-07-23T12:34:56'),
      car_id: '456',
    };

    // Create a new Log instance using the model's constructor
    const log = new Log(data);

    // Save the Log instance
    await log.save();

    // Find the saved log in the database
    const savedLog = await Log.findOne({ id: data.id });

    // Verify that the returned log object is an instance of Log
    expect(savedLog).toBeInstanceOf(Log);

    // Verify that the log object has the correct properties
    expect(savedLog.id).toBe(data.id);
    expect(savedLog.data_hora.toISOString()).toBe(data.data_hora.toISOString());
    expect(savedLog.car_id).toBe(data.car_id);
  });

  it('should have a default value for data_hora', async () => {
    // Create some sample data without specifying the data_hora property
    const dataWithoutDate = {
      id: '123',
      car_id: '456',
    };

    // Create a new Log instance without specifying the data_hora property
    const log = new Log(dataWithoutDate);

    // Save the Log instance
    await log.save();

    // Find the saved log in the database
    const savedLog = await Log.findOne({ id: dataWithoutDate.id });

    // Verify that the data_hora property is set to the default value (Date.now())
    expect(savedLog.data_hora).toEqual(expect.any(Date));
  });
});
