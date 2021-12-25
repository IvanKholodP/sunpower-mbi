import { Router, Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import GeneralController from "./GeneralController";

export default class GetAdminProductsController extends GeneralController {
	readonly path = '/api/get-admin-products';
	public router = Router();

	constructor(){
		super();
		this.initializeRoute();
	}

	public initializeRoute() {
		this.router.get(this.path, this.autorizeAdmin, this.errorHandler, this.initializeApi)
	}

	async initializeApi (req: Request, res: Response) {
		try {
			const Products = new ProductModel();
			const result = await Products.getProducts();
			res.json(result);
		} catch (error) {
			throw error;
		}
	}
}