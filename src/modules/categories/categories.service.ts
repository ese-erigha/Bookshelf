import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './interfaces/category.entity.interface';
import { CategoriesRepository } from './categories.repository';


@Injectable()
export class CategoriesService extends BaseService<CategoryEntity> {

  constructor(categoryRepository: CategoriesRepository) {
    super(categoryRepository);
  }

}