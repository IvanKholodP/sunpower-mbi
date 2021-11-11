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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const global_1 = require("../@types/global");
const Worker_1 = require("../entity/Worker");
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
class WorkerModel {
    async createWorker(args) {
        try {
            const worker = (0, typeorm_1.getRepository)(Worker_1.Worker);
            const candidat = await worker.findOne({ email: args.email });
            if (candidat) {
                throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.WORKER_DOES_NOT_ADD);
            }
            ;
            const workerObj = worker.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                phoneNumber: args.phoneNumber,
                position: args.position,
                renderOrder: args.renderOrder,
                status: global_1.EGeneralStatus.OPEN,
            });
            const errors = await (0, class_validator_1.validate)(workerObj);
            if (errors.length === 0) {
                const result = await worker.save(workerObj);
                return { result, message: 'Працівника успішно добавлено', errors };
            }
            throw new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.WORKER_DOES_NOT_ADD);
        }
        catch (error) {
            return new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.WORKER_DOES_NOT_ADD);
        }
    }
}
exports.default = WorkerModel;
