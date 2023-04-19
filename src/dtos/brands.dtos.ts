import { IsString, IsNotEmpty, isString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateBrandDto {
  readonly id: number;
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly nameProduct: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
