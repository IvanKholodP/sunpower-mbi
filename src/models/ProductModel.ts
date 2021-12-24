import { getRepository } from "typeorm";
import { TCreateProductTypes, EGeneralType, TGetProductTypes, TGetdressTypes, EProductType } from "../@types/global";
import { Products } from "../entity/Products";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";
import Helpers from "../utils/Helpers";

export default class ProductModel {
    async createProduct(args: TCreateProductTypes) {
        try {
            const productRepository = getRepository(Products);
            const newProduct: Products = productRepository.create({
                type: args.type,
                producer: args.producer,
                series: args.series,
                power: args.power,
                free: args.free,
                actualy: args.actualy,
                comments: args.comments,
                status: EGeneralType.ACTIVE
            });
            const result = await productRepository.save(newProduct);
            return {result, message: 'Продукт успішно добавлено'}
        } catch (error) {
            return new ErrorHandler(EResponseCodes.AUTH_ERROR);
        }
    }

    async getProducts() {
        try {
            const productRepository = getRepository(Products);
            const products = await productRepository.find({where:{status: EGeneralType.ACTIVE}});
            const productObj: TGetProductTypes[] = [];
            for (const product of products) {
                const frontEndProduct: TGetProductTypes = {
                    productId: product.productId,
                    type: product.type,
                    producer: product.producer,
                    series: product.series,
                    power: product.power,
                    free: product.free,
                    actualy: product.actualy,
                    comments: product.comments
                }

                if (frontEndProduct.type === EProductType.SOLAR) {
                    frontEndProduct.kWt = Helpers.calculateFreeKWt(frontEndProduct.power, frontEndProduct.free);
                }
                productObj.push(frontEndProduct);
            }
            const sortProduct = productObj.sort((a, b)=> a.power - b.power);
            const result = sortProduct;
            return result;
        } catch (error) {
            return new ErrorHandler(EResponseCodes.AUTH_ERROR);
        }
    }
}