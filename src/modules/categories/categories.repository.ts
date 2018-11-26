import { BaseRepository } from './../base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryEntity } from './interfaces/category.entity.interface';
import { BaseModel } from './../base/interfaces/base.model.interface';


@Injectable()
export class CategoriesRepository extends BaseRepository<CategoryEntity> {

  constructor(@InjectModel('Category') categoryDBSet: BaseModel<CategoryEntity>) {
    super(categoryDBSet)
  }
}