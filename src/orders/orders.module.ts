import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}