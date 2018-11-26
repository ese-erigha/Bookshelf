import { AuthorEntity } from '../interfaces/author.entity.interface';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
  import { AuthorsService } from './../authors.service';
import { Injectable } from '@nestjs/common';


  @ValidatorConstraint({name: 'isAuthorAlreadyExist', async: true})
  @Injectable()
  export class IsAuthorAlreadyExist implements ValidatorConstraintInterface{

    constructor(protected readonly authorService: AuthorsService){}

    async validate(text: string, validationArguments:ValidationArguments){
        const author: AuthorEntity = await this.authorService.findOne({name: text});
        return author ? false : true;
    }
  }

  
