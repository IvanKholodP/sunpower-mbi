import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EGeneralStatus } from "../@types/global";

@Entity({name: 'workers'})
export class Worker {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@Column()
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@Column()
	@IsNotEmpty()
	@IsMobilePhone()
	phoneNumber: string;

	@Column()
	@IsNotEmpty()
	@IsEmail()
	email: string; 

	@Column()
	@IsNotEmpty()
	@IsString()
	position: string;

	@Column()
	@IsNotEmpty()
	@IsNumber()
	renderOrder: number;

	@Column()
	status: number;

	@CreateDateColumn({type: 'timestamp with time zone'})
    createAt?: Date;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt?: Date;
} 