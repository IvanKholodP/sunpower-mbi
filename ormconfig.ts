import { ConnectionOptions } from 'typeorm';
import { Admin } from './src/entity/Admin';
import { Adress } from './src/entity/Adress';
import { Applications } from './src/entity/Applications';
import { User } from "./src/entity/User";
import { Worker } from './src/entity/Worker';

const config: ConnectionOptions = {
	type: "postgres",
	url: process.env.DATABASE_URL,
	// host: process.env.DB_HOST,
	// port: 5432,
	// username: process.env.DB_USERNAME,
	// password: process.env.DB_PASSWORD,
	// database: process.env.DB_DATABASE,
	ssl:{ 
		rejectUnauthorized: false 
	},
	synchronize: true,
	logging: false,
	entityPrefix: "mbi_",
	entities: [User, Worker, Applications, Admin, Adress],
};

export default config;