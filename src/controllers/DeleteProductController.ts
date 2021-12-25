import { Router, Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import GeneralController from "./GeneralController";

export default class DeleteProductController extends GeneralController {
	readonly path = '/api/delete-admin-product';
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
			const result = await Product.deleteProduct(req.body);
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}