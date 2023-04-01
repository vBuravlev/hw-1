const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  API_PATH: `${process.env.PROTOCOL}://${process.env.API}:${process.env.PORT}${process.env.PREFIX}${process.env.VERSION_API}`,
};
