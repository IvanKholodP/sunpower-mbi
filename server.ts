import dotenv from 'dotenv';
dotenv.config();
import App from "./app";
import AddAdressController from './src/controllers/AddAdressController';
import AddApplicationController from './src/controllers/AddApplicationController';
import AddWorkerController from "./src/controllers/AddWorkerController";
import AuthAdminController from './src/controllers/AuthAdminController';
import AuthUserController from "./src/controllers/AuthUserController";
import DeleteMyAppController from './src/controllers/DeleteMyAppController';
import GetAdminApplicationsController from './src/controllers/GetAdminApplicationsControllers';
import GetAdminController from './src/controllers/GetAdminController';
import GetAdressController from './src/controllers/GetAdressController';
import GetApplicationsController from './src/controllers/GetApplicationsController';
import GetMyAppsController from './src/controllers/GetMyAppsController';
import GetUserController from "./src/controllers/GetUserController";
import PutAdminAppController from './src/controllers/PutAdminAppController';
import PutMyAppController from './src/controllers/PutMyAppController';
import RegistrationAdminController from './src/controllers/RegistrationAdminController';
import RegistrationUser from "./src/controllers/RegistrationUserController";
import TelegramBot from './src/utils/telegram/TelegramBot';
import Telegram from './telegram';



function init() {
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
		new GetAdminController(),
		new AddAdressController(),
		new GetAdressController(),
	]);

	const telegram = new Telegram();

	//app.bot.telegram.setWebhook(`${process.env.URL}/bot/${app.bot.secretPathComponent()}`);
	//const triggersRate = ["курс", "Курс", "Бот курс валют", "Бот дай курс", "Бот дай курс валют" ];
	//const triggersGetApps = ['мої заявки', 'Мої заявки', 'Бот мої заявки']
	//app.bot.help(telegram.botHelp)
	//app.bot.start(telegram.botStart)
	//app.bot.hears(triggersRate, telegram.getRate);
	//app.bot.hears(triggersGetApps, telegram.getAllMyApp);
	//app.bot.command("rate", telegram.getRate);
	//app.bot.command('apps', telegram.getAllMyApp);
	//app.bot.on("contact", telegram.getContact);
	//app.bot.on('text', telegram.getAppData);
	//app.bot.on("text", telegram.notExist);
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
