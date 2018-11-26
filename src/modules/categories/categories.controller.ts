import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { CategoryEntity } from './interfaces/category.entity.interface';
import { BaseController } from './../base/base.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';

@Controller('category')
export class CategoriesController extends BaseController<CategoryEntity> {

  constructor(categoriesService: CategoriesService){
    super(categoriesService);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() categoryDto: CreateCategoryDto) {
      return await this.create(categoryDto);
  }

  @Put(':id')
  public async updateItem(@Param('id', ValidateIdPipe) id: string, @Body(new ValidationPipe({ transform: true })) categoryDto: UpdateCategoryDto) {
      return await this.update(id,categoryDto);
  }
}