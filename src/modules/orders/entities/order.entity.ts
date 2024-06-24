import { Customers } from "src/modules/customers/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Orders'})
export class Orders {
    @PrimaryGeneratedColumn()
    OrderID: number;

    @ManyToOne(() => Customers, (customers) => customers.orders, { nullable: false })
    @JoinColumn({ name: 'CustomerID' })
    CustomerID: Customers;
    
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    OrderDate: Date;
    
}
