import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customers } from 'src/customers/entities/customer.entity';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>) { }

    async findAllOrders() {
        return await this.ordersRepository  
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.CustomerID', 'customers')
            .getMany()
    }

    createOrder(dto: CreateOrderDto) {
        const order = this.ordersRepository.create(dto)
        Object.assign(order, dto)
        return this.ordersRepository.save(order);
    }

    
}
