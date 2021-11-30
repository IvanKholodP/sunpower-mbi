import { Router, Request, Response } from "express";
import GeneralController from "./GeneralController";

export default class PutMyAppController extends GeneralController {
	readonly path: string = '/api/change_my_app';
	public router = Router();
	
	constructor() {
		super()
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.put(this.path, this.autorize, this.errorHandler, this.initializeApi);
	}

	async initializeApi (req: Request, res: Response) {
		
	}
}