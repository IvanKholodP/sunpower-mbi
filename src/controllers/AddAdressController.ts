import { Router, Request, Response } from "express";
import AdressModel from "../models/AdressModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class AddAdressController extends GeneralController {
	readonly path = '/api/add-store';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.post(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const adress = new AdressModel();
			const result = await adress.addNewAdress(req.body);
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}