import dotenv from 'dotenv';
dotenv.config();
import App from "./app";
import AddAdressController from './src/controllers/AddAdressController';
import AddApplicationController from './src/controllers/AddApplicationController';
import AddWorkerController from "./src/controllers/AddWorkerController";
import AuthAdminController from './src/controllers/AuthAdminController';
import AuthUserController from "./src/controllers/AuthUserController";
import DeleteAdressController from './src/controllers/DeleteAdminAdressController';
import DeleteMyAppController from './src/controllers/DeleteMyAppController';
import GetAdminApplicationsController from './src/controllers/GetAdminApplicationsControllers';
import GetAdminController from './src/controllers/GetAdminController';
import GetAdressController from './src/controllers/GetAdressController';
import GetAdressUserController from './src/controllers/GetAdressUserController';
import GetApplicationsController from './src/controllers/GetApplicationsController';
import GetMyAppsController from './src/controllers/GetMyAppsController';
import GetUserController from "./src/controllers/GetUserController";
import PutAdressController from './src/controllers/PutAdminAdressController';
import PutAdminAppController from './src/controllers/PutAdminAppController';
import PutMyAppController from './src/controllers/PutMyAppController';
import RegistrationAdminController from './src/controllers/RegistrationAdminController';
import RegistrationUser from "./src/controllers/RegistrationUserController";
import Telegram from './telegram';



function init() {
	const app = new App([
		// user
		new RegistrationUser(),
		new AuthUserController(),

		new GetUserController(),
		new GetAdressUserController(),
		new GetApplicationsController(),
		new GetMyAppsController(),

		new AddWorkerController(),
		new AddApplicationController(),

		new PutMyAppController(),

		new DeleteMyAppController(),

		// admin
		new RegistrationAdminController(),
		new AuthAdminController(),

		new GetAdminApplicationsController(),
		new GetAdminController(),
		new GetAdressController(),

		new AddAdressController(),

		new PutAdminAppController(),
		new PutAdressController(),

		new DeleteAdressController()
	]);

	const telegram = new Telegram();
	telegram.launch()
	app.listen();

	//process.once("SIGINT", () =>  app.bot.stop("SIGINT"));
	//process.once("SIGTERM", () => app.bot.stop("SIGTERM"));

	process.on('SIGINT', () => {
		console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
		process.exit(1);
	});
}

init()
