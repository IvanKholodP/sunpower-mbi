import { Router, Request, Response } from "express";
import AuthModel from "../models/AuthModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class AuthAdminController extends GeneralController {
    readonly path = '/api/authAdmin';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute(){
		this.router.post(this.path, this.errorHandler, this.initializeApi)
    }
    
    async initializeApi(req: Request, res: Response){
		try {
			const admin = new AuthModel();
			const result = await admin.authAdmin(req.body);
            res.send(result);
		} catch (error) {
			res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.AUTH_ERROR), error]}
			});
		}
	}
}