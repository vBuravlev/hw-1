const path = require('node:path');
require('dotenv').config({ path:  path.resolve(__dirname, '../.env')});

console.log(process.env)

module.exports = {
  development: {
	  dialect: 'postgres',
    logging: process.env.DB_SQL_LOGGING === 'true' ? true : false,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    timestamps: true
  }
};


