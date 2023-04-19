import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';
import { User } from './../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Angie Torres',
      email: 'Paola87@gmail.com',
      identification: 2150687,
      isActive: true,
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const upUser = this.findOne(id);
    if (upUser) {
      const indexUser = this.users.findIndex((item) => item.id === id);
      this.users[indexUser] = {
        ...upUser,
        ...payload,
      };
      return this.users[indexUser];
    }
    return null;
  }

  delete(id: number) {
    const userFound = this.users.findIndex((item) => item.id === id);
    if (userFound > 0) {
      this.users.splice(userFound, 1);
      return true;
    } else {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
