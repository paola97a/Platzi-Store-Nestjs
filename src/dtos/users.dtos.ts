import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto {
  readonly id: number;
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsNumber()
  readonly identification: number;
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
