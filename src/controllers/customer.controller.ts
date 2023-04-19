import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dtos';
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomersService) {}
  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id') id: number) {
    return this.customerService.findOne(+id);
    // return {
    //   message: 'Información de cliente',
    //   body: {
    //     identification: `${identification}`,
    //   },
    // };
  }
  @Post()
  createCustomer(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
    // return {
    //   message: 'Creación de cliente',
    //   payload,
    // };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(+id, payload);
    // return {
    //   message: 'Actualización de cliente',
    //   id,
    //   payload,
    // };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.customerService.delete(+id);
    // return {
    //   message: 'Eliminar cliente',
    //   id,
    // };
  }
}
