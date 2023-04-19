import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdersDto, UpdateOrderDto } from './../dtos/orders.dtos';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: CreateOrdersDto[] = [
    {
      id: 1,
      creationDate: '1997-10-27',
      isEnable: true,
    },
  ];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  create(payload: CreateOrdersDto) {
    this.counterId += 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const upOrder = this.findOne(id);
    if (upOrder) {
      const indexOrder = this.orders.findIndex((item) => item.id === id);
      this.orders[indexOrder] = {
        ...upOrder,
        ...payload,
      };
      return this.orders[indexOrder];
    }
    return null;
  }

  delete(id: number) {
    const orderFound = this.orders.findIndex((item) => item.id === id);
    if (orderFound > 0) {
      this.orders.splice(orderFound, 1);
      return true;
    } else {
      throw new NotFoundException(`Order #${id} not found`);
    }
  }
}
