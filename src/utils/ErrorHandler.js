"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EResponseCodes = void 0;
var EResponseCodes;
(function (EResponseCodes) {
    EResponseCodes["REGISTRATIONS_ERROR"] = "REGISTRATIONS_ERROR";
    EResponseCodes["REGISTRATIONS_NOT_SUCSSES"] = "REGISTRATIONS_NOT_SUCSSES";
    EResponseCodes["AUTH_ERROR"] = "AUTH_ERROR";
    EResponseCodes["WORKER_DOES_NOT_ADD"] = "WORKER_DOES_NOT_ADD";
    EResponseCodes["TOKEN_WRONG"] = "TOKEN_WRONG";
    EResponseCodes["APP_DOES_NOT_ADD"] = "APP_DOES_NOT_ADD";
})(EResponseCodes = exports.EResponseCodes || (exports.EResponseCodes = {}));
const ResponseCodes = [
    {
        code: EResponseCodes.REGISTRATIONS_NOT_SUCSSES,
        message: 'Користувач не зареєстрований'
    },
    {
        code: EResponseCodes.REGISTRATIONS_ERROR,
        message: 'Помилка при реєстрації'
    },
    {
        code: EResponseCodes.AUTH_ERROR,
        message: 'Помилка входу'
    },
    {
        code: EResponseCodes.WORKER_DOES_NOT_ADD,
        message: 'Працівника не добавлено'
    },
    {
        code: EResponseCodes.TOKEN_WRONG,
        message: 'Токен не вірний'
    },
    {
        code: EResponseCodes.APP_DOES_NOT_ADD,
        message: 'Заявку не добавлено'
    },
];
class ErrorHandler extends Error {
    constructor(code = EResponseCodes.REGISTRATIONS_NOT_SUCSSES, message) {
        super();
        this.name = 'Error text';
        if (code) {
            this.code = code;
        }
        else {
            this.code = EResponseCodes.REGISTRATIONS_NOT_SUCSSES;
        }
        try {
            this.message = message || ResponseCodes.find((o) => o.code === code).message;
        }
        catch (error) {
            this.message = 'Unexpected error';
        }
    }
}
exports.default = ErrorHandler;
