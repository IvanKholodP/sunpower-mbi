import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getRepository } from "typeorm";
import { Admin } from '../entity/Admin';
import { User } from "../entity/User";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";

export default class AuthModel {
	public generateAccessToken = (userId: number, email: string) => {
		const payload: object = {
			userId,
			email
		}
		return jwt.sign(payload, process.env.JWT_SECRET_WORD, { expiresIn: "1h" });
	};

	public generateAdminAccessToken = (adminId: number, phoneNumber: string) => {
		const payload: object = {
			adminId,
			phoneNumber
		}
		return jwt.sign(payload, process.env.JWT_SECRET_WORD, { expiresIn: "1h" });
	};

	async authUser(args) {
		try {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne({email: args.email});
			if (!user) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}
			const isMatchPassword: boolean = await bcrypt.compare(args.password, user.password);
			if (!isMatchPassword) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}

			const token: string = this.generateAccessToken(user.userId, user.email);
			return { token, userId: user.userId, message: 'Вхід виконано' };

		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}

	async authAdmin(args) {
		try {
			const adminRepository = getRepository(Admin);
			const admin = await adminRepository.findOne({phoneNumber: args.phoneNumber});
			console.log('admin:', admin)
			if (!admin) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}
			const isMatchPassword: boolean = await bcrypt.compare(args.password, admin.password);
			if (!isMatchPassword) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}

			const tokenAdmin: string = this.generateAdminAccessToken(admin.adminId, admin.phoneNumber);
			console.log('token:', tokenAdmin)
			return { tokenAdmin, adminId: admin.adminId, message: 'Вхід виконано' };
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}
}