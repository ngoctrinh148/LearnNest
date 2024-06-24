import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomersService } from 'src/customers/customers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get()
  findAllOrders() { return this.ordersService.findAllOrders() }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto);
  }
}
