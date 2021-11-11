import { getRepository } from "typeorm";
import { User } from "../entity/User";

export default class UserModel {
	async getUser (args) {
		try {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne({where: {userId: args}} );
			return {email: user.email, firstName: user.firstName, lastName: user.lastName} ;
		} catch (error) {
			throw error
		}
	}
}