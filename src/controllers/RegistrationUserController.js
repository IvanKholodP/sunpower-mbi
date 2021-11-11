"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RegistrationModel_1 = __importDefault(require("../models/RegistrationModel"));
const GeneralController_1 = __importDefault(require("./GeneralController"));
class RegistrationUserController extends GeneralController_1.default {
    constructor() {
        super();
        this.path = '/api/registration';
        this.router = (0, express_1.Router)();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(this.path, this.errorHandler, this.initializeApi);
    }
    async initializeApi(req, res) {
        try {
            const user = new RegistrationModel_1.default();
            const result = await user.createUser(req.body);
            res.send(result);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
}
exports.default = RegistrationUserController;
