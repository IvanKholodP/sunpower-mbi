"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const AddApplicationController_1 = __importDefault(require("./src/controllers/AddApplicationController"));
const AddWorkerController_1 = __importDefault(require("./src/controllers/AddWorkerController"));
const AuthUserController_1 = __importDefault(require("./src/controllers/AuthUserController"));
const GetUserController_1 = __importDefault(require("./src/controllers/GetUserController"));
const RegistrationUserController_1 = __importDefault(require("./src/controllers/RegistrationUserController"));
function init() {
    const app = new app_1.default([
        new RegistrationUserController_1.default(),
        new AuthUserController_1.default(),
        new AddWorkerController_1.default(),
        new GetUserController_1.default(),
        new AddApplicationController_1.default(),
    ]);
    app.listen();
    process.on('SIGINT', () => {
        console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
        process.exit(1);
    });
}
init();
