import { IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
export class CreateOrdersDto {
  readonly id: number;
  @IsNotEmpty()
  @IsDateString()
  readonly creationDate: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly isEnable: boolean;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly isEnable?: boolean;
}
