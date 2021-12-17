import jwt from 'jsonwebtoken';
import {Request, Response, ErrorRequestHandler, NextFunction} from 'express';
import ErrorHandler, { EResponseCodes } from '../utils/ErrorHandler';

export default class GeneralController {
	constructor(){

	}

	initializeApi(req: Request, res: Response){
		return
	}

	errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
		if(err){
			res.send(err);
		} else {
			next();
		}
	}

	autorize(req: Request, res: Response, next: NextFunction) {
		if (req.method === 'OPTIONS') {
			return next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				next( new ErrorHandler(EResponseCodes.TOKEN_WRONG))
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
			req.body.user = decoded;
			next()
		}catch (error) {
			return next(error)
		}
	}

	autorizeAdmin(req: Request, res: Response, next: NextFunction) {
		if (req.method === 'OPTIONS') {
			return next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				next( new ErrorHandler(EResponseCodes.TOKEN_WRONG))
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
			req.body.admin = decoded;
			next()
		}catch (error) {
			return next(error)
		}
	}
}