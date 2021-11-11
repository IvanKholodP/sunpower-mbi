export enum EResponseCodes{
	REGISTRATIONS_ERROR = 'REGISTRATIONS_ERROR',
	REGISTRATIONS_NOT_SUCSSES = 'REGISTRATIONS_NOT_SUCSSES',
	AUTH_ERROR ='AUTH_ERROR',
	WORKER_DOES_NOT_ADD = 'WORKER_DOES_NOT_ADD',
	TOKEN_WRONG = 'TOKEN_WRONG',
	APP_DOES_NOT_ADD = 'APP_DOES_NOT_ADD',
}

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
]

export default class ErrorHandler extends Error{
	code: string;

	constructor(code: EResponseCodes = EResponseCodes.REGISTRATIONS_NOT_SUCSSES, message?: string){
		super();
		this.name = 'Error text';
		if(code) {
			this.code = code;
		} else {
			this.code = EResponseCodes.REGISTRATIONS_NOT_SUCSSES;
		}
		try {
			this.message = message || ResponseCodes.find((o) => o.code === code).message;
		} catch (error){
			this.message = 'Unexpected error';
		}
	}
}