import { Router, Request, Response } from "express";
import UserModel from "../models/UserModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class GetUserController extends GeneralController {
	readonly path = '/api/';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.get(this.path, this.autorize, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response ) {
		try {
			const user = new UserModel();
			const result = await user.getUser(req.body.user.userId);
			res.json(result);
		} catch (error) {
			res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.AUTH_ERROR), error]}
			});
		}
	}
}