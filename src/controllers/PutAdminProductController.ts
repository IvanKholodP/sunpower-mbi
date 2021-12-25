import { Router, Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import GeneralController from "./GeneralController";

export default class PutProductController extends GeneralController {
	readonly path = '/api/change-admin-product';
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
			const Product = new ProductModel();
			const result = await Product.editProduct(req.body);
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}