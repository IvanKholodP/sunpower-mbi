import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'admin'})
export class Admin {
    @PrimaryGeneratedColumn()
    adminId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({type: "bigint"})
    phoneNumber: number;

    @Column(
        {nullable: true, type: 'bigint'}
    )
    botId?: number;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt?: Date;

    @CreateDateColumn({type: 'timestamp with time zone'})
    createAt?: Date;
}