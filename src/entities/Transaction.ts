import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Client } from "./Client";

export enum TransactionTypes {
    DEPOSIT = "deposit",
    WITHDRAW = 'withdraw'
}

@Entity()
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type: string

    @Column({
        type: "numeric"
    })
    amount: number

    @ManyToOne(
        type => Client,
        client => client.transactions,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: 'client_id'
    })
    client: Client
}