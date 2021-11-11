import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { EGeneralStatus } from "../@types/global";
import { Worker } from "../entity/Worker";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";

export default class WorkerModel {
	async createWorker (args) {
		try {
			const worker = getRepository(Worker);
			const candidat = await worker.findOne({email: args.email})
			if (candidat) {
				throw new ErrorHandler(EResponseCodes.WORKER_DOES_NOT_ADD);
			};
			const workerObj: Worker = worker.create({
				firstName: args.firstName,
				lastName: args.lastName,
				email: args.email,
				phoneNumber: args.phoneNumber,
				position: args.position,
				renderOrder: args.renderOrder,
				status: EGeneralStatus.OPEN,
			});
			const errors = await validate(workerObj);
			if (errors.length === 0) {
				const result = await worker.save(workerObj);
				return {result, message: 'Працівника успішно добавлено', errors};
			} 
			throw new ErrorHandler(EResponseCodes.WORKER_DOES_NOT_ADD);
		} catch (error) {
			return new ErrorHandler(EResponseCodes.WORKER_DOES_NOT_ADD);
		}
	}
}