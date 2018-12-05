import { AuthorQueryDto } from './../interfaces/author.query.dto';
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
        let query : AuthorQueryDto = {fullName: text};  
        const author: AuthorEntity = await this.authorService.findOne(query);
        return author ? false : true;
    }
  }

  
