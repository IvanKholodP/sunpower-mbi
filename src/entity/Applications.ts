import { MinLength } from 'class-validator';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { User } from './User';

@Entity({name: 'applications'})
export class Applications {
	@PrimaryGeneratedColumn()
	appId?: number;

	@Column()
	@MinLength(3)
	deliverPlaning: string;

	@Column()
	goods: string;

	@Column()
	sendMethod: string;

	@Column()
	city: string;

	@Column()
	recipientData: string;

	@Column()
	payer: string;

	@Column()
	commentsSales: string;

	@Column({nullable: true})
	commentsLogist?: string;

	@Column()
	status: number;

	@Column()
	type: number;

	@Column()
	month: number;

	@Column()
	year: number;

	@CreateDateColumn({type: 'timestamp with time zone'})
	createAt?: string;

	@UpdateDateColumn({type: 'timestamp with time zone'})
	updateAt?: Date

	@ManyToOne((type)=> User, (users: User) => users.userId)
	user?: User
}
