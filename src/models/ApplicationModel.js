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
const moment_1 = __importDefault(require("moment"));
const typeorm_1 = require("typeorm");
const global_1 = require("../@types/global");
const Applications_1 = require("../entity/Applications");
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
class ApplicationModel {
    async createApplication(args) {
        var _a;
        try {
            const application = (0, typeorm_1.getRepository)(Applications_1.Applications);
            const appObj = application.create({
                deliverPlaning: args.deliverPlaning,
                goods: args.goods,
                sendMethod: args.sendMethod,
                city: args.city,
                recipientData: args.recipientData,
                payer: args.payer,
                commentsSales: args.commentsSales,
                status: global_1.EGeneralStatus.OPEN,
                type: global_1.EGeneralType.ACTIVE,
                month: Number((0, moment_1.default)().format('MM')),
                year: Number((0, moment_1.default)().format('YYYY')),
                user: (_a = args === null || args === void 0 ? void 0 : args.user) === null || _a === void 0 ? void 0 : _a.userId,
            });
            const result = await application.save(appObj);
            console.log('model:', result);
            return { result, message: 'Заявку успішно добавлено' };
        }
        catch (error) {
            console.log('eroor:', error);
            return new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.AUTH_ERROR);
        }
    }
}
exports.default = ApplicationModel;
