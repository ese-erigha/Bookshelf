import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/category.schema';
import { IsCategoryAlreadyExist } from './validators/IsCategoryAlreadyExist';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository,IsCategoryAlreadyExist],
  exports: [CategoriesService]
})
export class CategoriesModule {}