const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  id: { 
    type: String 
  },
  data_hora: { 
    type: Date, 
    default: Date.now 
  },
  car_id: { 
    type: String 
  }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
