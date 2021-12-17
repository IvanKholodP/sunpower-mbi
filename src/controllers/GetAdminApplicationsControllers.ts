import { Router, Request, Response } from "express";
import ApplicationModel from "../models/ApplicationModel";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import GeneralController from "./GeneralController";

export default class GetAdminApplicationsController extends GeneralController {
    readonly path = '/api/dashboard-apps'
    public router = Router();

    constructor() {
        super()
        this.initializeRoute();
    }

    public initializeRoute() {
        this.router.get(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi);
    }

    async initializeApi (req: Request, res: Response) {
        try {
            const applications = new ApplicationModel();
            const result = await applications.getAllApplications();
            res.json(result);
        } catch (error) {
            res.json({data: {
				errors: [new ErrorHandler(EResponseCodes.AUTH_ERROR), error]}
			});
        }
    }
}