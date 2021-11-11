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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
class GeneralController {
    constructor() {
    }
    initializeApi(req, res) {
        return;
    }
    errorHandler(err, req, res, next) {
        if (err) {
            res.send(err);
        }
        else {
            next();
        }
    }
    autorize(req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                next(new ErrorHandler_1.default(ErrorHandler_1.EResponseCodes.TOKEN_WRONG));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_WORD);
            req.body.user = decoded;
            next();
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = GeneralController;
