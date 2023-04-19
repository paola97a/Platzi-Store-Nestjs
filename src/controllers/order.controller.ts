import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { OrdersService } from './../services/orders.service';
import { CreateOrdersDto, UpdateOrderDto } from './../dtos/orders.dtos';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getQueryOrders(
    @Query('id') id: number,
    @Query('state') state = 'indefinido',
  ) {
    // return `La orden ${id} se encuentra ahora mismo ${state}`;
    return this.orderService.findAll();
  }

  @Get(':id')
  getOrders(@Param('id') id: string) {
    // return `La orden ${id} se encuentra activa`;
    return this.orderService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateOrdersDto) {
    // return {
    //   message: 'Acción de crear',
    //   payload,
    // };
    return this.orderService.create(payload);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    // return {
    //   message: 'Actualización orden',
    //   id,
    // };
    return this.orderService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(+id);
    // return {
    //   message: 'Eliminar orden',
    //   id,
    // };
  }
}
