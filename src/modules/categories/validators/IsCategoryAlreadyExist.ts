import { CategoryEntity } from '../interfaces/category.entity.interface';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
import { CategoriesService } from './../categories.service';
import { Injectable } from '@nestjs/common';
import { CategoryQueryDto } from '../interfaces/category.query.dto';


  @ValidatorConstraint({name: 'isCategoryAlreadyExist', async: true})
  @Injectable()
  export class IsCategoryAlreadyExist implements ValidatorConstraintInterface{

    constructor(protected readonly categoryService: CategoriesService){}

    async validate(text: string, validationArguments:ValidationArguments){

       let query: CategoryQueryDto = {
        name : text
       }
       
        const category: CategoryEntity = await this.categoryService.findOne(query);
        return category ? false : true;
    }
  }

  
