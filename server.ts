import dotenv from 'dotenv';
dotenv.config();
import App from "./app";
import AddApplicationController from './src/controllers/AddApplicationController';
import AddWorkerController from "./src/controllers/AddWorkerController";
import AuthUserController from "./src/controllers/AuthUserController";
import GetApplicationsController from './src/controllers/GetApplicationsController';
import GetMyAppsController from './src/controllers/GetMyAppsController';
import GetUserController from "./src/controllers/GetUserController";
import RegistrationUser from "./src/controllers/RegistrationUserController";
import Telegram from './telegram';



function init() {
	const bot = new Telegram()
	const app = new App([
		new RegistrationUser(),
		new AuthUserController(),
		// user
		new AddWorkerController(),
		new GetUserController(),
		new AddApplicationController(),
		new GetApplicationsController(),
		new GetMyAppsController()
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