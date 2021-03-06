import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getRepository } from "typeorm";
import { EGeneralType } from '../@types/global';
import { Admin } from '../entity/Admin';
import { User } from "../entity/User";
import ErrorHandler, { EResponseCodes } from "../utils/ErrorHandler";

export default class AuthModel {
	public generateAccessToken = (userId: number, email: string) => {
		const payload: object = {
			userId,
			email
		}
		return jwt.sign(payload, process.env.JWT_SECRET_WORD, {expiresIn: '1y'});
	};

	public generateAdminAccessToken = (adminId: number, phoneNumber: number) => {
		const payload: object = {
			adminId,
			phoneNumber
		}
		return jwt.sign(payload, process.env.JWT_SECRET_WORD, {expiresIn: '1y'});
	};

	async authUser(args) {
		try {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne({email: args.email, status: EGeneralType.ACTIVE});
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
			if (!admin) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}
			const isMatchPassword: boolean = await bcrypt.compare(args.password, admin.password);
			if (!isMatchPassword) {
				throw new ErrorHandler(EResponseCodes.AUTH_ERROR);
			}

			const tokenAdmin: string = this.generateAdminAccessToken(admin.adminId, admin.phoneNumber);
			return { tokenAdmin, adminId: admin.adminId, message: 'Вхід виконано' };
		} catch (error) {
			return new ErrorHandler(EResponseCodes.AUTH_ERROR);
		}
	}
}