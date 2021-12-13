import {Router, Request, Response} from 'express';
import RegistrationModel from '../models/RegistrationModel';
import GeneralController from './GeneralController';

class RegistrationUserController extends GeneralController{
	readonly path = '/api/registration';
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
			const result = await user.createUser(req.body);
			res.json(result);
		}catch(error){
			res.json({message: error.message});
		}
	}
}

export default RegistrationUserController;