import { Router, Request, Response } from "express";
import ApplicationModel from "../models/ApplicationModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class AddApplicationController extends GeneralController {
	readonly path = '/api/add_application';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.post(this.path, this.autorize, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const application = new ApplicationModel();
			const result = await application.createApplication(req.body);
			console.log('body:', req.body)
			res.json({
				data: result
			});
			console.log('controller', result)
		} catch (error) {
			res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.APP_DOES_NOT_ADD), error]}
			});
		}
	}
}