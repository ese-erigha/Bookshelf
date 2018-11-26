import { ValidationResult } from './validators/validation-result.interface';
import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { BookEntity } from './interfaces/book.entity.interface';
import { BaseController } from './../base/base.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';
import { AuthorsValidationService } from './services/authors.validation.service';

@Controller('book')
export class BooksController extends BaseController<BookEntity> {

  private readonly _bookService: BooksService;
  constructor(booksService: BooksService,private readonly authorsValidationService: AuthorsValidationService){
    super(booksService);
    this._bookService = booksService;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() bookDto: CreateBookDto) {

    this.authorsValidationService.validateAuthors(bookDto); //throws an HTTPException if validation fails
    return await this._bookService.createNewBook(bookDto);
  }

//   @Put(':id')
//   public async updateItem(@Param('id', ValidateIdPipe) id: string, @Body(new ValidationPipe({ transform: true })) authorDto: UpdateAuthorDto) {
//       return await this.update(id,authorDto);
//   }
}