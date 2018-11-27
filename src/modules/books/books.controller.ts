import { CategoryEntity } from './../categories/interfaces/category.entity.interface';
import { CategoryDto } from './../categories/dto/category.dto';
import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { BookEntity } from './interfaces/book.entity.interface';
import { BaseController } from './../base/base.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from './../categories/categories.service';
import { AuthorsValidationService } from './services/authors.validation.service';
import { AuthorDto } from './../authors/dto/author.dto';
import { AuthorEntity } from './../authors/interfaces/author.entity.interface';
import { ValidationResult } from './validators/validation-result.interface';
import {BookCustomService} from './services/book.custom.service';


@Controller('book')
export class BooksController extends BaseController<BookEntity> {

  private readonly _bookService: BooksService;
  constructor(booksService: BooksService,private readonly authorsValidationService: AuthorsValidationService, private readonly _authorService: AuthorsService, private readonly _categoryService: CategoriesService, private readonly _bookCustomService: BookCustomService){
    super(booksService);
    this._bookService = booksService;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() bookDto: CreateBookDto) {

    this.authorsValidationService.validateAuthors(bookDto); //throws an HTTPException if validation fails
    bookDto = await this._bookCustomService.saveForeignEntities(bookDto);
    return await this._bookService.createNewBook(bookDto);
  }

//   @Put(':id')
//   public async updateItem(@Param('id', ValidateIdPipe) id: string, @Body(new ValidationPipe({ transform: true })) authorDto: UpdateAuthorDto) {
//       return await this.update(id,authorDto);
//   }
}