import { registerAs } from '@nestjs/config';

console.log(process.env)

export const sqlConfig = registerAs('database', () => ({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	autoLoadEntities: true,
	synchronize: true,
	logging: process.env.DB_SQL_LOGGING === 'true' ? true : false,
}));
