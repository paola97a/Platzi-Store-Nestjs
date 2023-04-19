import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BrandsService } from './../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandsService) {}
  @Get()
  getBrands() {
    return this.brandService.findAll();
  }
  @Get(':id')
  getBrand(@Param('id') id: number) {
    return this.brandService.findOne(+id);
  }
  @Post()
  createCategory(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
    // return {
    //   message: 'Creación de marca',
    //   payload,
    // };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandService.update(+id, payload);
    // return {
    //   message: 'Actualización de marca',
    //   id,
    //   payload,
    // };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(+id);
    // return {
    //   message: 'Eliminar marca',
    //   id,
    // };
  }
}
