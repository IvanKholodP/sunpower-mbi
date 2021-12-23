import { Router, Request, Response } from "express";
import AdressModel from "../models/AdressModel";
import GeneralController from "./GeneralController";

export default class PutAdressController extends GeneralController {
	readonly path = '/api/change-storage';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.put(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const adress = new AdressModel();
			const result = await adress.editAdress(req.body);
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}