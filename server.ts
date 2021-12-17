import dotenv from 'dotenv';
dotenv.config();
import App from "./app";
import AddApplicationController from './src/controllers/AddApplicationController';
import AddWorkerController from "./src/controllers/AddWorkerController";
import AuthAdminController from './src/controllers/AuthAdminController';
import AuthUserController from "./src/controllers/AuthUserController";
import DeleteMyAppController from './src/controllers/DeleteMyAppController';
import GetAdminApplicationsController from './src/controllers/GetAdminApplicationsControllers';
import GetApplicationsController from './src/controllers/GetApplicationsController';
import GetMyAppsController from './src/controllers/GetMyAppsController';
import GetUserController from "./src/controllers/GetUserController";
import PutAdminAppController from './src/controllers/PutAdminAppController';
import PutMyAppController from './src/controllers/PutMyAppController';
import RegistrationAdminController from './src/controllers/RegistrationAdminController';
import RegistrationUser from "./src/controllers/RegistrationUserController";
import Telegram from './telegram';



function init() {
	const bot = new Telegram()
	const app = new App([
		// user
		new RegistrationUser(),
		new AuthUserController(),

		new AddWorkerController(),
		new GetUserController(),
		new AddApplicationController(),
		new GetApplicationsController(),
		new GetMyAppsController(),

		new PutMyAppController(),

		new DeleteMyAppController(),

		// admin
		new RegistrationAdminController(),
		new AuthAdminController(),
		new GetAdminApplicationsController(),
		new PutAdminAppController(),
	]);

	app.listen();
	bot.launch();

	process.once("SIGINT", () =>  bot.bot.stop("SIGINT"));
	process.once("SIGTERM", () => bot.bot.stop("SIGTERM"));

	process.on('SIGINT', () => {
		console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
		process.exit(1);
	});
}

init()