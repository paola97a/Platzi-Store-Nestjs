import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dtos';
@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: CreateCustomerDto[] = [
    {
      id: 1,
      name: 'Rosa Perez',
      identification: 1052687,
      celPhone: 3189754215,
      city: 'Popayan',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(identification: number) {
    const customer = this.customers.find(
      (item) => item.identification === identification,
    );
    if (!customer) {
      throw new NotFoundException(`Customer ${identification} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(identification: number, payload: UpdateCustomerDto) {
    const upCustomer = this.findOne(identification);
    if (upCustomer) {
      const indexCustomer = this.customers.findIndex(
        (item) => item.identification === identification,
      );
      this.customers[indexCustomer] = {
        ...upCustomer,
        ...payload,
      };
      return this.customers[indexCustomer];
    }
    return null;
  }

  delete(id: number) {
    const customerFound = this.customers.findIndex((item) => item.id === id);
    if (customerFound > 0) {
      this.customers.splice(customerFound, 1);
      return true;
    } else {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }
}
