import { Markup, Context} from "telegraf";
import { commands } from "./telegramCommands";
import fetch from 'node-fetch';
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import ErrorHandler from "../ErrorHandler";

class TelegramBot {
	async botStart (ctx: Context) {
		try {
			await ctx.reply(
				`Привіт!
				Щоб скористатися всіма функціями бота, натисніть кнопку, щоб надіслати свій контакт`,
				Markup.keyboard([[Markup.button.contactRequest("Відправити контакт")]])
					.oneTime()
					.resize()
			);
		} catch (error) {
			console.error(error);
		}
	}

	async getContact (ctx) {
		try {
			await ctx.reply(`
				Привіт, ${ctx.from.first_name}!
				Я твій помічник для роботи.
				Щоб дізнатись про мої команди, натисни /help або скористайся меню.
			`);
			const user = getRepository(User);
			const candidat: User = await user.findOne({phoneNumber: ctx.message.contact.phone_number})
			candidat.botId = ctx.message.contact.user_id;
			await user.save(candidat);
		} catch (error) {
			console.error(error);
		}
	}

	async botHelp(ctx: Context){
			try {
				await ctx.reply(commands);
			} catch (error) {
				console.error(error);
			}
	}

	async getRate(ctx: Context) {
		try {
			const response = await fetch("https://api.monobank.ua/bank/currency");
			const body = await response.json();
			const USD = body.find((el) => Number(el.currencyCodeA) === 840);
			const EUR = body.find((el) => Number(el.currencyCodeA) === 978);
			const cross = body.find((el) => Number(el.currencyCodeA) === 978 && Number(el.currencyCodeB) === 840);
			const formatData = `
				Buy / Sell
				EUR/USD: ${cross.rateBuy} / ${cross.rateSell},
				USD: ${USD.rateBuy} / ${USD.rateSell},
				EUR: ${EUR.rateBuy} / ${EUR.rateSell},`;
			await ctx.reply(formatData);
		} catch (error) {
			await ctx.reply('Запит можна зробити один раз протягом хвилини')
			console.error(error);
		}
	}

	async notExist(ctx: Context) {
		try {
			await ctx.reply("Даної команди не існує");
		} catch (error) {
			console.error(error);
		}
	}

	async registerNewUserData(args) {
		try {
			const botTextMessage = `
				Зареєстровано нового користувача:		
				Ім'я: ${args.firstName}		
				Прізвище: ${args.lastName}		
				Номер мобільного: ${args.phoneNumber}		
				Електронна пошта: ${args.email}		
				`;
			return botTextMessage;
		} catch (error) {
			console.error(error);
		}
	}
	async registerNewUser(ctx: Context) {
		try {
			let bot;
			const data = await this.registerNewUserData(bot)
			console.log(data)
		} catch (error) {
			console.error(error);
		}
	}
}



export default TelegramBot;