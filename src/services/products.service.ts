import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
/**
 * SERVICIOS EN NESTJS.
 * Estan pensados para proporcionar la capa de acceso a datos que necesitan las aplicaciones
 * para funcionar. El servicio tiene el trabajo de gestionar con los datos realizando operaciones
 * por ejemplo modificar.
 * nest g s <service-name> (nest g s services/products --flat)
 * Los servicios usan el decorador '@Injectable()' y se importan en los providers de app.module
 * con el comando se agrega automaticamente.
 * Manejo de errores con NestJS.
 * Nestjs implementa de forma sencilla el control de errores para los clientes, a través de unas
 * clases que implementan los códigos http dependiendo del tipo de error.
 * Importando "NotFoundException" se arrojan errores con la palabra reservada throw codigo 404.
 * "ForbiddenException" el ususario no tiene permisos para acceder al recurso.
 * "InternalServerErrorException" error en el servidor.
 * Recurso de clases de exepciones con NestJs https://docs.nestjs.com/exception-filters#built-in-http-exceptions
 */

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Es el producto 1 de prueba',
      price: 45000,
      image: '',
      stock: 75,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const upProduct = this.findOne(id);
    if (upProduct) {
      const indexProduct = this.products.findIndex((item) => item.id === id);
      this.products[indexProduct] = {
        ...upProduct,
        ...payload,
      };
      return this.products[indexProduct];
    }
    return null;
  }

  delete(id: number) {
    const productFound = this.products.findIndex((item) => item.id === id);
    if (productFound > 0) {
      this.products.splice(productFound, 1);
      return true;
    } else {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
