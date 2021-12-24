import { Router, Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import GeneralController from "./GeneralController";

export default class AddProductController extends GeneralController {
	readonly path = '/api/add-product';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.post(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const Product = new ProductModel();
			const result = await Product.createProduct(req.body);
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}