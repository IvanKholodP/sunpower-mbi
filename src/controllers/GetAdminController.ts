import { Router, Request, Response } from "express";
import AdminModel from "../models/AdminModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class GetAdminController extends GeneralController {
	readonly path = '/api/dashboard';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.get(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response ) {
		try {
			const admin = new AdminModel();
            const result = await admin.getAdmin(req.body.admin.adminId);
			res.json(result);
		} catch (error) {
			res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.AUTH_ERROR), error]}
			});
		}
	}
}