"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const ormconfig_1 = __importDefault(require("./ormconfig"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.initializeMiddleWares();
        this.initializeControllers(controllers);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeMiddleWares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, connect_history_api_fallback_1.default)({
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.use('/', express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
        }
    }
    ;
    async listen() {
        const port = process.env.PORT || 5000;
        this.app.listen(port, async () => {
            try {
                const connection = await (0, typeorm_1.createConnection)(ormconfig_1.default);
                console.log("Connected to PostgreeSQL");
                console.log(`Server has been started on ${port}`);
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
        });
    }
}
exports.default = App;
