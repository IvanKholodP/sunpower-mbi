import { Markup, Context} from "telegraf";
import { commands } from "./telegramCommands";
import fetch from 'node-fetch';
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import { Applications } from "../../entity/Applications";
import { EAdressStatus, EGeneralType } from "../../@types/global";
import Helpers from "../Helpers";
import { Adress } from "../../entity/Adress";

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
			const user = getRepository(User);
			const admin = getRepository(Admin);
			const candidat: User = await user.findOne({phoneNumber: ctx.message.contact.phone_number})
			const administrator: Admin = await admin.findOne({phoneNumber: ctx.message.contact.phone_number})
			if (candidat) {
				candidat.botId = ctx.message.contact.user_id;
				await user.save(candidat);
				await ctx.reply(`
				Привіт, ${ctx.from.first_name}!
				Я твій помічник для роботи.
				Щоб дізнатись про мої команди, натисни /help або скористайся меню.
			`);
			} else if (administrator) {
				administrator.botId = ctx.message.contact.user_id;
				await admin.save(administrator);
				await ctx.reply(`
				Привіт, ${ctx.from.first_name}!
				Я твій помічник для роботи.
				Щоб дізнатись про мої команди, натисни /help або скористайся меню.
			`);
			} else {
				await ctx.reply('Ви не є авторизованим користувачем')
			}
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
			const user = getRepository(User);
			const admin = getRepository(Admin);
			const candidat: User = await user.findOne({botId: ctx.message.from.id})
			const administrator: Admin = await admin.findOne({botId: ctx.message.from.id})
			if (candidat || administrator) {
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
			} else {
				await ctx.reply("У вас немає доступу до даної команди");
			}			
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

	async getAppData(ctx: any, next: Function) {
		try {
			const user = getRepository(User);
			const admin = getRepository(Admin);
			const candidat: User = await user.findOne({botId: ctx.message.from.id})
			const administrator: Admin = await admin.findOne({botId: ctx.message.from.id})
			if (candidat || administrator) {
				const AppRepository = getRepository(Applications);
				if (Number(ctx.message.text)) {
					const appData = await AppRepository.findOne({appId: ctx.message.text});
					if (appData) {
						if (appData.type) {
							const formatAppData = `
							Дані заявки №${appData.appId}:
								Статус: ${Helpers.setAppStatus(appData.status)}
								Коментар логіста: ${Helpers.deleteNullFromMessage(appData.commentsLogist)}
								Дата доставки: ${appData.deliverPlaning}
								Вантаж: ${appData.goods}
								Спосіб доставки: ${appData.sendMethod}
								Адреса отримувача: ${appData.city}
								Дані отримувача: ${appData.recipientData}
								Платник: ${appData.payer}
								Коментар менеджера: ${appData.commentsSales}
								`;
							return await ctx.reply(formatAppData);
						} 
						return await ctx.reply("Заявка була видалена");
					}
					return await ctx.reply("Заявки не існує");
				} else {
					next()
				}
			} else {
				await ctx.reply("У вас немає доступу до даної команди");
			}	
		} catch (error) {
			console.error(error);
		}
	}

	async getAllMyApp(ctx: Context, next: Function) {
		try {
			const AppRepository = getRepository(Applications);
			const UserRepository = getRepository(User);
			const user = await UserRepository.findOne({botId: ctx.message.from.id});
			if (user) {
				const apps = await AppRepository.find({where: {user: user.userId, type: EGeneralType.ACTIVE}});
				if (apps) {
					const appsList = [];
					apps.map((item)=> {
						if (item.status < 3) {
							appsList.push(
								`Заявка №: ${item.appId} - Статус: ${Helpers.setAppStatus(item.status)} - Коментар логіста :${Helpers.deleteNullFromMessage(item.commentsLogist)}`);
						}
					});
					if (appsList.length > 0) {
						return await ctx.reply(appsList.join(',  ').toString());
					} 
					return await ctx.reply("У Вас немає активних заявок");
				}
				return await ctx.reply("У Вас немає активних заявок");
			}
			return await ctx.reply("У вас немає доступу до даної команди");
		} catch (error) {
			console.error(error);
		}
		
	}

	async adressButton(ctx: Context) {
		try {
			const user = getRepository(User);
			const admin = getRepository(Admin);
			const candidat: User = await user.findOne({botId: ctx.message.from.id})
			const administrator: Admin = await admin.findOne({botId: ctx.message.from.id})
			if (candidat || administrator) {
				await ctx.replyWithHTML("<b>Адреси:</b>", Markup.inlineKeyboard([
					[
						Markup.button.callback("ДСВ", 'ДСВ'),
						Markup.button.callback("Мінісклад", 'Мінісклад'),
						Markup.button.callback("Офіс", 'Офіс'),
					]])
				)
			} else {
				await ctx.reply("У вас немає доступу до даної команди");
			}
		} catch (error) {
		  console.error(error);
		}
	  };

	async adressDSV(ctx: any) {
		try {
			await ctx.answerCbQuery();
			const AdressRepository = getRepository(Adress);
			const adress = await AdressRepository.findOne({nameStore: ctx.callbackQuery.data, status: EAdressStatus.ACTIVE});
			if(adress) {
				const dataAdress = `${adress.adressStore}`;
				return await ctx.reply(dataAdress);
			} else {
				return await ctx.reply("немає адреси")
			}
		} catch (error) {
			console.error(error);
		}
	}

	async adressMini(ctx: any) {
		try {
			await ctx.answerCbQuery();
			const AdressRepository = getRepository(Adress);
			const adress = await AdressRepository.findOne({nameStore: ctx.callbackQuery.data, status: EAdressStatus.ACTIVE});
			if(adress) {
				const dataAdress = `${adress.adressStore}`;
				return await ctx.reply(dataAdress);
			} else {
				return await ctx.reply("немає адреси")
			}
		} catch (error) {
			console.error(error);
		}
	}

	async adressOffice(ctx: any) {
		try {
			await ctx.answerCbQuery();
			const AdressRepository = getRepository(Adress);
			const adress = await AdressRepository.findOne({nameStore: ctx.callbackQuery.data, status: EAdressStatus.ACTIVE});
			if(adress) {
				const dataAdress = `${adress.adressStore}`;
				return await ctx.reply(dataAdress);
			} else {
				return await ctx.reply("немає адреси")
			}
		} catch (error) {
			console.error(error);
		}
	}
}



export default TelegramBot;