import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'adress'})
export class Adress {
    @PrimaryGeneratedColumn()
    adressId: number;

    @Column()
    nameStore: string;

    @Column()
    adressStore: string;

    @Column({nullable: true, type: 'bigint'})
    status: number;

    @UpdateDateColumn({type: 'timestamp with time zone'})
    updateAt?: Date;

    @CreateDateColumn({type: 'timestamp with time zone'})
    createAt?: Date;
}