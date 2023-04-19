import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dtos';
@Controller('categories')
export class CategoriesController {
  constructor(private categoryServices: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoryServices.findAll();
  }

  @Get(':id')
  getCategory(@Param('id') id: number) {
    return this.categoryServices.findOne(+id);
  }

  // @Get(':id/products/:productId')
  // getCategories(
  //   @Param('productId') productId: string,
  //   @Param('id') id: string,
  // ) {
  //   return {
  //     message: 'Información de categoria',
  //     body: {
  //       productId: `${productId}`,
  //       category: `${id}`,
  //     },
  //   };
  // }
  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryServices.create(payload);
    // return {
    //   message: 'Creación de categoria',
    //   payload,
    // };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoryServices.update(+id, payload);
    // return {
    //   message: 'Actualización de categoria',
    //   id,
    //   payload,
    // };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryServices.delete(+id);
    // return {
    //   message: 'Eliminar categoria',
    //   id,
    // };
  }
}
