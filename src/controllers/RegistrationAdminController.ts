import {Router, Request, Response} from 'express';
import RegistrationModel from '../models/RegistrationModel';
import GeneralController from './GeneralController';

class RegistrationAdminController extends GeneralController{
	readonly path = '/api/registrationAdmin';
	public router = Router();

	constructor() {
		super()
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.post(this.path, this.errorHandler, this.initializeApi);
	}

	async initializeApi(req: Request, res: Response) {
		try {
			const user = new RegistrationModel();
			const result = await user.createAdmin(req.body);
			res.json(result);
		}catch(error){
			res.json({message: error.message});
		}
	}
}

export default RegistrationAdminController;