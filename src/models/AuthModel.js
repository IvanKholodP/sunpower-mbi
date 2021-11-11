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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
class AuthModel {
    constructor() {
        this.generateAccessToken = (userId, email) => {
            const payload = {
                userId,
                email
            };
            return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_WORD, { expiresIn: "1h" });
        };
    }
    async authUser(args) {
        try {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const user = await userRepository.findOne({ email: args.email });
            if (!user) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.AUTH_ERROR);
            }
            const isMatchPassword = await bcryptjs_1.default.compare(args.password, user.password);
            if (!isMatchPassword) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.AUTH_ERROR);
            }
            const token = this.generateAccessToken(user.userId, user.email);
            return { token, userId: user.userId, message: 'Вхід виконано' };
        }
        catch (error) {
            return new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.AUTH_ERROR);
        }
    }
}
exports.default = AuthModel;
