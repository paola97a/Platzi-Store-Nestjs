import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: CreateCategoryDto[] = [
    {
      id: 1,
      name: 'Aseo',
      registryDate: '2021-05-12',
    },
  ];
  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const upCategory = this.findOne(id);
    if (upCategory) {
      const indexCategory = this.categories.findIndex((item) => item.id === id);
      this.categories[indexCategory] = {
        ...upCategory,
        ...payload,
      };
      return this.categories[indexCategory];
    }
    return null;
  }

  delete(id: number) {
    const categoryFound = this.categories.findIndex((item) => item.id === id);
    if (categoryFound > 0) {
      this.categories.splice(categoryFound, 1);
      return true;
    } else {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
