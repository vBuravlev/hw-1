const mongoose = require('mongoose');
const { mongoURI } = require('./config/index.js');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
