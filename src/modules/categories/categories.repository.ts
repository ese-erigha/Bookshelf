import { BaseRepository } from './../base/base.repository';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryEntity } from './interfaces/category.entity.interface';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoryEntity> {

  constructor(@InjectModel('Category') private readonly categoryDBSet: Model<CategoryEntity>) {
    super(categoryDBSet)
  }
}