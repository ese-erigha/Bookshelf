import { BookEntity } from '../interfaces/book.entity.interface';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
  import { BooksService } from './../books.service';
import { Injectable } from '@nestjs/common';


@ValidatorConstraint({name: 'isBookAlreadyExist', async: true})
@Injectable()
export class IsBookAlreadyExist implements ValidatorConstraintInterface{

    constructor(protected readonly bookService: BooksService){}

    async validate(text: string, validationArguments:ValidationArguments){
        const book: BookEntity = await this.bookService.findOne({title: text});
        return book ? false : true;
    }
}

  
