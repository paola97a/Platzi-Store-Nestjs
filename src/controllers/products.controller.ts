import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  //ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './../services/products.service';
import { ParseIntPipe } from './../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
/**Nest Js implementa principios solid en el desarrollo de software uno de ellos es:
 * Principio de responsabilidad única donde cada pieza de software debe tener una
 *  función única.
 * Para mantener el orden en el proyecto se recomienda crear un directorio llamado controllers
 *  donde se agrupan todos los controladores.
 * Es importante tener en cuenta la documentación de NestJs, para generar código rapidamente
 *  nest g controller <controler-name> --flat (--flat para eliminar la subcarpeta).
 * Método Post: el método de HTTP se utiliza para creación usando datos, para ello se importa
 * los decoradores Post(Para indicar que el endpoint es de tipo Post) y Body(Para capturar los datos
 * provenientes del front).
 * Método Put se utiliza para la actualización de datos recibe el cuerpo y el id, por otro lado,
 * Delete se usa para eliminar.
 * CÓDIGOS DE ESTADO:
 *  Hay cinco familias de códigos de estados http que se utilizan para que las Apis informen
 *  correctamente la situación de la solicitud.
 *  - Estado informativo (100-199)
 *  - Estado de éxito (200-299)
 *  - Estado de redirección (300-399)
 *  - Estados de error de cliente (400-499)
 *  - Estados de error de servidor (500-599)
 * Desde Nestjs se pueden manejar dichos códigos para ello se importa el decorador HttpCode y el
 * enumerado HttpStatus desde @nestjs/common.
 * NESTJS es agnostico es decir por detrás y se puede usar el motor express u otro. Con express se
 * puede manejar códigos para eso se importa Res como decorador y Response desde express.
 * INYECCIÓN DE DEPENDENCIAS.
 * NestJs se encarga de la inyección de dependecias de tal forma que no debemos instanciar
 * manualmente.
 * - Los controladores inyectan los servicios desde su constructor.De esta manera cada endpoint
 *   puede hacer uso de su lógica de servicio.
 * Introducción a PIPES.
 * Nesjs usa el concepto PIPES para la validación y transformación de datos antes del ingreso
 * al controlador.
 * Casos de uso: tiene 2
 *  - Transformación: transforma datos de entrada deseada (ejm de cadena a entero).
 *  - Validación: evalúa los datos de entrada, y si son validos los pasa a controlador, de
 *    lo contrario lanza una excepción.
 * NesJs ya trae Pipes para su implementación, importalos "ParseIntPipe", luego se lo
 * puede agregar al decorador '@Param' como segundo paámetro, para transformar el valor
 * y asegurar que sea de tipo entero, caso contrarío lanza excepción.

 */

@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //http://localhost:3000/products?brand=xyz&limit=20
  @Get()
  getProductsQuery(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return `products => ${limit} offset => ${offset} brand => ${brand}`;
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductsFiler(@Res() response: Response) {
    response.status(200).send({
      message: 'yo soy un método no dinámico',
    });
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  getProducts(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   body: {
    //     productId: `${params.productId}`,
    //   },
    // };
    return this.productsService.findOne(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'Acción de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
