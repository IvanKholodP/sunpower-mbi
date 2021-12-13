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
		const triggersRate = ["курс", "Курс"];

		this.bot.help(telegram.botHelp)
		this.bot.start(telegram.botStart)

		this.bot.hears(triggersRate, telegram.getRate);
		this.bot.command("rate", telegram.getRate);
		this.bot.on("contact", telegram.getContact);
		this.bot.on("text", telegram.notExist);

		this.bot.launch()
	}
}

export default Telegram;
