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

export enum EAdressStatus {
	DELETED=0,
	ACTIVE=1,
}
export enum EProductType {
	SOLAR='solar',
	OTHER='other'
}

export interface IUserRegistrationProps {
	firstName: string,
	lastName: string,
	email:string,
	phoneNumber: string,
	password: string,
	retryPassword: string
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

export type TEditMyAppTypes = {
	appId: number,
	deliverPlaning: string,
	goods: string,
	sendMethod: string,
	city: string,
	recipientData: string,
	payer: string,
	commentsSales: string,
	updateAt: Date,
};


export type TDeleteMyAppTypes = {
	appId: number,
	type: EGeneralType,
	status: EGeneralStatus,
	updateAt: Date,
};

export type TCreateAdminTypes = {
	adminId: number,
	firstName: string,
	lastName: string,
	password: string,
	retryPassword: string,
	phoneNumber: number,
};

export type TEditAdminAppTypes = {
	appId: number,
	commentsLogist: string,
	status: number
};

export type TAddNewAdressTypes = {
	nameStore: string,
	adressStore: string
};


export type TGetdressTypes = {
	nameStore: string,
	adressStore: string,
	adressId: number
};

export type TEditAdressTypes = {
	nameStore: string,
	adressStore: string,
	adressId: number,
	status: number
};

export type TCreateProductTypes = {
	type: string,
	producer: string,
	series: string,
	power: number,
	free: number,
	actualy: number,
	comments: string,
};

export type TGetProductTypes = {
	productId: number,
	type: string,
	producer: string,
	series: string,
	power: number,
	free: number,
	actualy: number,
	comments: string,
	kWt?: number,
};