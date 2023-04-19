/**
 * Creando Data Transfers Objects.
 * Nestjs implementa objetos de transferencia de datos para el tipado de datos y segurización
 * Son clases en el que se indica la estuctura de objetos de solicitud.
 * Para ello se crea un archivo con extensión ".dto.ts", para indicar que es un DTO.
 * "readonly" es una palabra propia de typescript y asegura que los datos no serán modificados
 * Se puede importar en el controlador y en el servicio para tipar el BODY del endpoint,
 * por ejemplo en la creación de producto.
 * ¿Por que una entidad no es lo mismo que DTO?, puesto que hay datos que no necesariamente
 * van a estar agregados en la base de datos por lo que e smejor práctica mantenerlos separados.
 * Nota: La aseguración de tipos solo ocurre para la experiencia de desarrollo y para ayudar a
 * los programadores, más no para validar el tipado.
 * En el caso de el atributo sea opcional agregamos '?' en este caso en UpdateProductDto.
 * Validación de datos con DTOS.
 * Utiliza el comando npm i class-validator class-transformer para instalar dos dependencias
 * que nos ayudan a validar de tipo de datos.
 * Las librerías traean un conjunto de decoradores para las propiedades de DTO y valida los tipos
 * de entrada.
 * Para porder usar class-validator se importa en main.ts
 * Para actualizar el producto podemos usar los mismos decoradores importados hace un momento, sin
 * embargo existe una forma más eficiente, Para ellos instalamos una dependencia de '@'nestj
 * npm i @nestjs/mapped-types que permite reutilizar código PartialType, tomando las validaciones
 * de CreateProductDto y haciendo opcionales sus atributos.
 */

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// export class UpdateProductDto {
//   readonly name?: string;
//   readonly description?: string;
//   readonly price?: number;
//   readonly stock?: number;
//   readonly image?: string;
// }
