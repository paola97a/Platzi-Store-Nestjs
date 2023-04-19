import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

/**
 * COMO CREAR UN PROPIO PIPE.
 * 1. Utilizando el comando nest generate pipe <pipe-name> o nest g pipe <pipe-name> se autogenera
 *    ---> nest g pipe common/parse-int
 * 2. Implementa la lógica del Pipe.
 *    usamos parseInt(value, 10) donde transformamos value en base 10, luego con
 *    el método isNaN(val) determinamos si se pudo parsear el valor.
 * 3. Importa y usa el pipe.
 *    Para ello vamos al controlador y lo importamos, acontinuación seguimos el
 *    procedimiento de agregarlo como párametro para el ejemplo en el decorador
 *    '@'param.
 * Nota: los pipes son una capa previa a los controladores para realizar esta validación.
 */
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`The value ${value} is not number`);
    }
    return value;
  }
}
