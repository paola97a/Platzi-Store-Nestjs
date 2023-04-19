import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './../services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  getQueryInfoUser(
    @Query('id') id: number,
    @Query('identification') identification: number,
    @Query('email') email: string,
  ) {
    return this.userService.findAll();
    // return {
    //   message: 'El usuario esta registrado con la siguiente información',
    //   body: {
    //     id: `${id}`,
    //     identification: `${identification}`,
    //     email: `${email}`,
    //   },
    // };
  }
  @Get('info/:id')
  getInfoUser(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
    // return {
    //   message: 'El usuario se ha creado con los datos: ',
    //   payload,
    // };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(+id, payload);
    // return {
    //   message: 'Usuario actualizado',
    //   id,
    //   payload,
    // };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
}
