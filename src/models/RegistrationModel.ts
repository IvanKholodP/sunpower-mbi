import {User} from '../entity/User';
import bcrypt from 'bcryptjs';
import {validate} from 'class-validator';
import { getRepository } from 'typeorm'
import ErrorHandler, {EResponseCodes} from '../utils/ErrorHandler';
import { Admin } from '../entity/Admin';
import { TCreateAdminTypes } from '../@types/global';

export default class RegistrationModel {
	async createUser(args) {
		try{
			const user = getRepository(User);
			const candidat: User = await user.findOne({email:args.email})
			if (candidat) {
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}
			const isNotEmptyPassword: string = args.password;
			if (isNotEmptyPassword.length < 5){
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}
			if(args.password !== args.retryPassword){
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}
			const hashPassword: string = await bcrypt.hash(args.password, 8);
			const userObj: User = user.create({
				firstName: args.firstName,
				lastName: args.lastName,
				email: args.email,
				phoneNumber: args.phoneNumber,
				password: hashPassword,
			});
			const errors = await validate(userObj);
			if (errors.length === 0) {
				const result = await user.save(userObj);
				return {result, message: 'Користувач успішно зареєстрований', errors};
			} 
			throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
		}catch(error){
			return new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
		};
	}

	async createAdmin(args: TCreateAdminTypes) {
		try {
			const admin = getRepository(Admin);
			const candidat: Admin = await admin.findOne({phoneNumber: args.phoneNumber});
			if (candidat) {
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}
			const isNotEmptyPassword: string = args.password;
			if (isNotEmptyPassword.length < 5){
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}
			if(args.password !== args.retryPassword){
				throw new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
			}

			const hashPassword: string = await bcrypt.hash(args.password, 8);
			const adminObj: Admin = admin.create({
				firstName: args.firstName,
				lastName: args.lastName,
				phoneNumber: args.phoneNumber,
				password: hashPassword,
			});
			const result = await admin.save(adminObj);
			return {result, message: 'Користувач успішно зареєстрований'};
		} catch (error) {
			return new ErrorHandler(EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
		}
		
	}
}
