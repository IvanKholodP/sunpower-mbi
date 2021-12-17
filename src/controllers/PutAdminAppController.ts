import { Router, Request, Response } from "express";
import ApplicationModel from "../models/ApplicationModel";
import GeneralController from "./GeneralController";

export default class PutAdminAppController extends GeneralController {
	readonly path: string = '/api/dashboard-change-app';
	public router = Router();
	
	constructor() {
		super()
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.put(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi);
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const application = new ApplicationModel();
			const result = await application.editAdminApp(req.body);
			res.json(result)
		} catch (error) {
			throw error;
		}
	}
}