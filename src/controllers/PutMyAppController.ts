import { Router, Request, Response } from "express";
import ApplicationModel from "../models/ApplicationModel";
import GeneralController from "./GeneralController";

export default class PutMyAppController extends GeneralController {
	readonly path: string = '/api/change_myApp';
	public router = Router();
	
	constructor() {
		super()
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.put(this.path, this.autorize, this.errorHandler, this.initializeApi);
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const application = new ApplicationModel();
			const result = await application.editMyApp(req.body);
			console.log('body', result)
			res.json(result)
		} catch (error) {
			throw error;
		}
		
		
	}
}