import { Controller, Post, Put, Body, Param} from '@nestjs/common';
import { CategoryEntity } from './interfaces/category.entity.interface';
import { BaseController } from './../base/base.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';


@Controller('category')
export class CategoriesController extends BaseController<CategoryEntity> {

  constructor(categoriesService: CategoriesService){
    super(categoriesService);
  }

  @Post()
  public async insert(@Body() categoryDto: CreateCategoryDto) {
      return await this.create(categoryDto);
  }

  @Put(':id')
  public async updateItem(@Param('id') id: string, @Body() categoryDto: CreateCategoryDto) {
      return await this.update(id,categoryDto);
  }
}