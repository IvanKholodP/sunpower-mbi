export enum EGeneralStatus {
	OPEN = 1,
	PROCESS= 2,
	CLOSED = 3,
	REJECT = 4,
}

export enum EGeneralType {
	DELETED=0,
	ACTIVE=1,
}

export interface UserProps {
	firstName: string,
	lastName: string,
	email:string,
	phoneNumber: string,
};

export type TApplicationTypes = {
	deliverPlaning: string,
	goods: string,
	sendMethod: string,
	city: string,
	recipientData: string,
	payer: string,
	commentsSales: string,
	status: EGeneralStatus,
	type: EGeneralType,
	month: number,
	year: number,
	user: any
};

export type TGetAllApplicationsUserTypes = {
	appId: number,
	deliverPlaning: string,
	goods: string,
	sendMethod: string,
	city: string,
	recipientData: string,
	payer: string,
	commentsSales: string,
	status: EGeneralStatus,
	month: number,
	year: number,
	createAt: string,
	updateAt: Date,
	commentsLogist: string
	firstName: string,
	lastName: string
};