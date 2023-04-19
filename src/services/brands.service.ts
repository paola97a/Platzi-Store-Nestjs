import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';
@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: CreateBrandDto[] = [
    {
      id: 1,
      name: 'Distribuidoras Limpio Todo',
      nameProduct: 'Jabones',
    },
  ];
  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const upBrand = this.findOne(id);
    if (upBrand) {
      const indexBrd = this.brands.findIndex((item) => item.id === id);
      this.brands[indexBrd] = {
        ...upBrand,
        ...payload,
      };
      return this.brands[indexBrd];
    }
    return null;
  }

  delete(id: number) {
    const brandFound = this.brands.findIndex((item) => item.id === id);
    if (brandFound > 0) {
      this.brands.splice(brandFound, 1);
      return true;
    } else {
      throw new NotFoundException(`Brand #${id} not found`);
    }
  }
}
