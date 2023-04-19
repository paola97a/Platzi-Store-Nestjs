import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

/**Los controladores se utilizan para recibir que viene de un cliente y poder validarlos
 * o trabajar con ellos(manipular permisos de usuario, filtro y manipulación de datos).
 * Manejan las rutas o endpoints.
 * NestJs comprende los slash en caso de que no se especifique en la url
 * 1. Get se implementa para recibir parámetros, para capturar estos datos se importa el
 *    decorador Param desde '@nestjs/common'
 * 2. Get admite parámetros de consulta que se capturán con el decorador '@Query' y
 *    se importa desde '@nestjs/common'.
 * Nota: La diferencia entre parámetros de ruta y parámetros de consulta es que en los
 * Los parámetros de consulta pueden ser opcionales y los de ruta se utilizan para IDs
 * u otros identificadores obligatorios.
 * Para evitar bloqueos de enrutamiento se deben poner los endpoints dinámicos en segundo
 * lugar.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo';
  }

  @Get('new')
  newEndpoint() {
    return 'Hi I´m new';
  }
}
