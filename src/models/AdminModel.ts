import { getRepository } from "typeorm";
import { Admin } from "../entity/Admin";

export default class UserModel {
	async getAdmin (args: number) {
		try {
			const userRepository = getRepository(Admin);
			const admin = await userRepository.findOne({where: {adminId: args}} );
			return {phoneNumber: admin.phoneNumber, firstName: admin.firstName, lastName: admin.lastName} ;
		} catch (error) {
			throw error;
		}
	}
}