import moment from "moment";
import { getRepository } from "typeorm";
import { EGeneralStatus, EGeneralType, TApplicationTypes } from "../@types/global";
import { Applications } from "../entity/Applications";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";

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
			const result = await application.save(appObj)
			console.log('model:',result)
			return {result, message: 'Заявку успішно добавлено'}
		} catch (error) {
			console.log('eroor:', error)
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}
}