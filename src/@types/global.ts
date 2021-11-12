export enum EGeneralStatus {
	OPEN = 1,
	CLOSED = 0,
}

export enum EGeneralType {
	ACTIVE=1,
	DELETED=0,
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