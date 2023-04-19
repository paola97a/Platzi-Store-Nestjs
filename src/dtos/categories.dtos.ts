import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCategoryDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsDateString()
  readonly registryDate: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
