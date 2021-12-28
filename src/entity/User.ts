import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { MinLength, MaxLength, IsEmail, IsNotEmpty, IsString, IsMobilePhone} from 'class-validator';
import { Applications } from "./Applications";

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    userId?: number;

    @Column()
    @MinLength(3)
    @MaxLength(50)
    @IsString()
    firstName: string;

    @Column()
    @MinLength(3)
    @MaxLength(50)
    @IsString()
    lastName: string;

    @Column({
        unique: true})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({
        nullable: true})
    @IsMobilePhone()
    phoneNumber: string;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    botId: number;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    status: number;

    @CreateDateColumn({type: 'timestamp with time zone'})
    createAt?: Date;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt?: Date;

    @OneToMany((type)=> Applications, (application: Applications) => application.user)
    applications?: Array<Applications>;
}
