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
const express_1 = require("express");
const WorkerModel_1 = __importDefault(require("../models/WorkerModel"));
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
const GeneralController_1 = __importDefault(require("./GeneralController"));
class AddWorkerController extends GeneralController_1.default {
    constructor() {
        super();
        this.path = '/api/dashboard/add_worker';
        this.router = (0, express_1.Router)();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(this.path, this.errorHandler, this.initializeApi);
    }
    async initializeApi(req, res) {
        try {
            const worker = new WorkerModel_1.default();
            const result = await worker.createWorker(req.body);
            res.json({
                data: result
            });
        }
        catch (error) {
            res.json({ data: {
                    errors: [new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.WORKER_DOES_NOT_ADD), error]
                }
            });
        }
    }
}
exports.default = AddWorkerController;
