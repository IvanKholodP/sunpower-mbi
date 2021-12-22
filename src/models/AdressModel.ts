import { getRepository } from "typeorm";
import { EAdressStatus, TAddNewAdressTypes, TEditAdressTypes } from "../@types/global";
import { Adress } from "../entity/Adress";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";

export default class AdressModel {
    async addNewAdress(args: TAddNewAdressTypes) {
        try {
            const adress = getRepository(Adress);
            const adressObj: Adress = adress.create({
                nameStore: args.nameStore,
                adressStore: args.adressStore,
                status: EAdressStatus.ACTIVE
            });
            const result = await adress.save(adressObj);
            return {result, message: 'Добавлено нову адресу'}
        } catch (error) {
            return new ErrorHandler(EResponseCodes.AUTH_ERROR);
        }
    }

    async getAdresses() {
        try {
            const Adresses = getRepository(Adress);
            const adress = await Adresses.find({where:{status: EAdressStatus.ACTIVE}});
            const adressObj: TEditAdressTypes[]= [];
            adress.forEach((item)=> {
                adressObj.push({
                    adressId: item.adressId,
                    adressStore: item.adressStore,
                    nameStore: item.nameStore
                })
            });
            return adressObj;
        } catch (error) {
            return new ErrorHandler(EResponseCodes.AUTH_ERROR);
        }
    }
}