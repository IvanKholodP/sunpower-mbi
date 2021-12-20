import moment from "moment";
import { getRepository } from "typeorm";
import Telegram from "../../telegram";
import { EGeneralStatus, EGeneralType, TApplicationTypes, TDeleteMyAppTypes, TEditAdminAppTypes, TEditMyAppTypes, TGetAllApplicationsUserTypes } from "../@types/global";
import { Applications } from "../entity/Applications";
import { User } from "../entity/User";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import Helpers from "../utils/Helpers";


const telegraf = new Telegram();

export default class ApplicationModel {
	async createApplication(args: TApplicationTypes) {
		try {
			const application = getRepository(Applications);
			const appObj: Applications = application.create({
				deliverPlaning: args.deliverPlaning,
				goods: args.goods,
				sendMethod: args.sendMethod,
				city: args.city,
				recipientData: args.recipientData,
				payer: args.payer,
				commentsSales: args.commentsSales,
				status: EGeneralStatus.OPEN,
				type: EGeneralType.ACTIVE,
				month: Number(moment().format('MM')),
				year: Number(moment().format('YYYY')),
				user: args?.user?.userId,
			})
			const result = await application.save(appObj);
			const UserRepository = getRepository(User);
			const manager = await UserRepository.findOne({userId: args.user.userId});
			const botTextMessage = `
				Створено нову заявку:
				Дата доставки: ${args.deliverPlaning}
				Вантаж: ${args.goods}
				Спосіб доставки: ${args.sendMethod}
				Адреса отримувача: ${args.city}
				Дані отримувача: ${args.recipientData}
				Платник: ${args.payer}
				Коментар менеджера: ${args.commentsSales}
			`;
			telegraf.bot.telegram.sendMessage(process.env.ADMIN_BOT_ID, botTextMessage);
			if(manager.botId){
				telegraf.bot.telegram.sendMessage(manager.botId, botTextMessage);
			}
			return {result, message: 'Заявку успішно добавлено'}
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async getAllApplications () {
		try {
			const applications = getRepository(Applications);
			const activeApp = await applications.find({where: {type: EGeneralType.ACTIVE }, relations: ["user"]});
			const allApp: TGetAllApplicationsUserTypes[] = [];
			activeApp.forEach((item)=>{
				allApp.push({
					appId: item.appId,
					deliverPlaning: item.deliverPlaning,
					goods: item.goods,
					sendMethod: item.sendMethod,
					city: item.city,
					recipientData: item.recipientData,
					payer: item.payer,
					commentsSales: item.commentsSales,
					status: item.status,
					month: item.month,
					year: item.year,
					firstName: item?.user?.firstName,
					lastName: item?.user?.lastName,
					createAt: item.createAt,
					updateAt: item.updateAt,
					commentsLogist: item.commentsLogist
				})
			})
			return allApp;
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async getMyApps (args: number) {
		try {
			const applications = getRepository(Applications);
			const myActiveApps = await applications.find({where: {type: EGeneralType.ACTIVE, user: args}});
			return myActiveApps;
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async editMyApp (args: TEditMyAppTypes) {
		try {
			const application = getRepository(Applications);
			const newApp = await application.findOne({where: {appId: args.appId}, relations: ["user"]})
			newApp.deliverPlaning = args.deliverPlaning;
			newApp.goods = args.goods;
			newApp.sendMethod = args.sendMethod;
			newApp.city = args.city;
			newApp.recipientData = args.recipientData;
			newApp.payer = args.payer;
			newApp.updateAt = args.updateAt;
			const result = await application.save(newApp);
			const botTextMessage = `
				Заявку №${args.appId} змінено:
				Дата доставки: ${args.deliverPlaning}
				Вантаж: ${args.goods}
				Спосіб доставки: ${args.sendMethod}
				Адреса отримувача: ${args.city}
				Дані отримувача: ${args.recipientData}
				Платник: ${args.payer}
				Коментар менеджера: ${args.commentsSales}
			`;
			telegraf.bot.telegram.sendMessage(process.env.ADMIN_BOT_ID, botTextMessage);
			if(newApp.user.botId){
				telegraf.bot.telegram.sendMessage(newApp.user.botId, botTextMessage);
			}
			return {result, message: 'Заявку успішно змінено'}
		} catch (error) {
			console.log("this bag:", error)
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async deleteMyApp (args: TDeleteMyAppTypes) {
		try {
			const application = getRepository(Applications);
			const removeApp = await application.findOne({where: {appId: args.appId}, relations: ["user"]})
			if (args.status != EGeneralStatus.OPEN){
				return {message: 'Заявку не можливо видалити'}
			}
			removeApp.updateAt = args.updateAt;
			removeApp.type = EGeneralType.DELETED;
			const result = await application.save(removeApp);
			const botTextMessage = `
				Заявку №${args.appId} видалено:
			`;
			telegraf.bot.telegram.sendMessage(process.env.ADMIN_BOT_ID, botTextMessage);
			if(removeApp.user.botId){
				telegraf.bot.telegram.sendMessage(removeApp.user.botId, botTextMessage);
			}
			return {result, message: 'Заявку успішно видалено'}
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async editAdminApp (args: TEditAdminAppTypes) {
		try {
			const application = getRepository(Applications);
			const newApp = await application.findOne({where: {appId: args.appId}, relations: ["user"]})
			newApp.commentsLogist = args.commentsLogist;
			const result = await application.save(newApp);
			const botTextMessage = `
				Заявку №${args.appId} змінено:
				Статус: ${Helpers.setAppStatus(args.status)},
				Коментар логіста: ${args.commentsLogist}
			`;
			telegraf.bot.telegram.sendMessage(process.env.ADMIN_BOT_ID, botTextMessage);
			if(newApp.user.botId){
				telegraf.bot.telegram.sendMessage(newApp.user.botId, botTextMessage);
			}
			return {result, message: 'Заявку успішно змінено'}
		} catch (error) {
			console.log("this bag:", error)
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}
}