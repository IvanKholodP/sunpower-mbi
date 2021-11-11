"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
class RegistrationModel {
    async createUser(args) {
        try {
            const user = (0, typeorm_1.getRepository)(User_1.User);
            const candidat = await user.findOne({ email: args.email });
            if (candidat) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
            }
            const isNotEmptyPassword = args.password;
            if (isNotEmptyPassword.length < 5) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
            }
            if (args.password !== args.retryPassword) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
            }
            const hashPassword = await bcryptjs_1.default.hash(args.password, 8);
            const userObj = user.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                phoneNumber: args.phoneNumber,
                password: hashPassword,
            });
            const errors = await (0, class_validator_1.validate)(userObj);
            if (errors.length === 0) {
                const result = await user.save(userObj);
                return { result, message: 'Користувач успішно зареєстрований', errors };
            }
            throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
        }
        catch (error) {
            return new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.REGISTRATIONS_NOT_SUCSSES);
        }
        ;
    }
}
exports.default = RegistrationModel;
