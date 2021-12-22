import { Telegraf } from 'telegraf';
import TelegramBot from './src/utils/telegram/TelegramBot';


class Telegram {
	public bot: Telegraf;

	constructor(){
		this.bot = new Telegraf(process.env.TELEGRAM_BOT);
		this.initBotMiddleWares();
	}

	private initBotMiddleWares() {
		this.bot.use(Telegraf.log());
	};


	public launch() {
		const telegram = new TelegramBot();
		//this.bot.telegram.setWebhook(`${process.env.URL}/bot/${this.bot.secretPathComponent()}`);
		const triggersRate = ["курс", "Курс", "Бот курс валют", "Бот дай курс", "Бот дай курс валют" ];
		const triggersGetApps = ['мої заявки', 'Мої заявки', 'Бот мої заявки']

		this.bot.help(telegram.botHelp)
		this.bot.start(telegram.botStart)

		this.bot.hears(triggersRate, telegram.getRate);
		this.bot.hears(triggersGetApps, telegram.getAllMyApp);
		this.bot.command("rate", telegram.getRate);
		this.bot.command('apps', telegram.getAllMyApp);
		this.bot.command('address', telegram.adressButton);
		this.bot.on("contact", telegram.getContact);
		this.bot.on('text', telegram.getAppData);
		this.bot.on("text", telegram.notExist);
		//this.bot.startWebhook(`/bot${this.bot.secretPathComponent()}`, null, 3000)
		this.bot.launch()
	}
}

export default Telegram;
