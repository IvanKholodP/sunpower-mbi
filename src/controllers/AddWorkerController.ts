import {Router, Request, Response} from 'express';
import WorkerModel from '../models/WorkerModel';
import ErrorHandler, { EResponseCodes } from '../utils/ErrorHandler';
import GeneralController from "./GeneralController";

export default class AddWorkerController extends GeneralController {
	readonly path = '/api/dashboard/add_worker';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.post(this.path, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const worker = new WorkerModel();
			const result = await worker.createWorker(req.body);
			res.json({
				data: result
			});
		} catch (error) {
			res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.WORKER_DOES_NOT_ADD), error]}
			});
		}
	}
}