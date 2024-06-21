import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  getCustomer() { return this.customersService.getCustomers() }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(@Body() dto : CreateCustomerDto) {
    return this.customersService.createCustomer(dto);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id : number){
    return await this.customersService.getCustomerById(id);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() dto : CreateCustomerDto){
    return await this.customersService.updateCustomer(id, dto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number){
    return await this.customersService.deleteCustomer(id)
  } 
}
