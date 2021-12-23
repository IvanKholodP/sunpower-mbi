import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EGeneralType, EProductType } from "../@types/global";

@Entity({name: 'product'})
export class Products {
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    type: EProductType;

    @Column()
    producer: string;

    @Column({type: 'bigint'})
    series: number;

    @Column({type: 'bigint'})
    power: number;

    @Column({type: 'bigint'})
    free: number;

    @Column({type: 'bigint'})
    actualy: number;

    @Column()
    status: EGeneralType;

    @Column()
    comments: string;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt?: Date;

    @CreateDateColumn({type: 'timestamp with time zone'})
    createAt?: Date;
}