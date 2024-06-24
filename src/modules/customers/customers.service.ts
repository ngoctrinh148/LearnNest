import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customers } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customers) private readonly customerRepository: Repository<Customers>) { }

  async getCustomers() { return await this.customerRepository.find() }

  async createCustomer(dto: Customers) {
    const newCustomer = this.customerRepository.create(dto);
    await this.customerRepository.createQueryBuilder()
        .insert()
        .into(Customers)
        .values(newCustomer)
        .execute();
    return newCustomer;
  }

  async getCustomerById(id: number) {
    const customer = this.customerRepository
      .createQueryBuilder('customer')
      .where(`customer.CustomerID = ${id}`)
      .getOne();
    return customer;
  }

  async updateCustomer(id: number, dto: CreateCustomerDto) {
    await this.customerRepository
      .createQueryBuilder('customers')
      .update(Customers)
      .set(dto)
      .where(`customers.CustomerID = ${id}`)
      .execute()
    const updatedCustomer = await this.customerRepository
      .createQueryBuilder('customer')
      .where(`customer.CustomerID = ${id}`)
      .getOne();
    return updatedCustomer;
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository
      .createQueryBuilder()
      .delete()
      .from(Customers)
      .where(`CustomerID = ${id}`)
      .execute()
    return customer
  }
}
