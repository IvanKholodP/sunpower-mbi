export interface IUserProps {
	firstName: string,
	lastName: string,
	email:string,
}

export interface IGetAllApp {
	appId: number,
	deliverPlaning: string,
	goods: string,
	sendMethod: string,
	city: string,
	recipientData: string,
	payer: string,
	commentsSales: string,
	status: number,
	month: number,
	year: number,
	createAt: string,
	updateAt: Date,
	commentsLogist: string
	firstName: string,
	lastName: string
}

export interface IGetMyApps {
	appId: number,
	deliverPlaning: string,
	goods: string,
	sendMethod: string,
	city: string,
	recipientData: string,
	payer: string,
	commentsSales: string,
	status: number,
	month: number,
	year: number,
	createAt: string,
	updateAt: Date,
	commentsLogist: string
}