import { Orders } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Customers'})
export class Customers{
    @PrimaryGeneratedColumn()
    CustomerID: number;

    @Column({name: 'FirstName', length: 60, nullable: false})
    FirstName: string

    @Column({name: 'LastName', length: 60, nullable: false})
    LastName: string

    @Column({name: 'Email', length: 60, nullable: true})
    Email: string

    @Column({name: 'PhoneNumber', length: 60, nullable: true})
    PhoneNumber: string

    @OneToMany(() => Orders, (orders) => orders.CustomerID)
    orders : Orders[]
}

