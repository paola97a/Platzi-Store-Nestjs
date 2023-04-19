import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCustomerDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly identification: number;
  @IsNumber()
  readonly celPhone: number;
  @IsString()
  readonly city: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
