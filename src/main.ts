import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**Para porder usar class-validator importamos de '@'nesjs/common ValidationPipe, luego antes de
 * que empiece a escuchar le decimos a app que use los pipes globales y hacemos una instancia de
 * validationPipe.
 * Podemos evitar campos que no estan definidos en los DTOS, lo que puede generán errores
 * o su almacenamiento en las bases de datos, para controlar esto, en main.ts se agregan atributos
 * de configuración al momento de instanciar ValidationPipe.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Ingnora datos que no están en DTOs.
      forbidNonWhitelisted: true, //Valida o lanza error si no existe en DTOs.
    }),
  );
  await app.listen(3000);
}
bootstrap();
