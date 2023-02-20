require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
  defaultPaginationLimit: 5,
  maxPaginationLimit: 25,
};
