import { BookDto } from './dto/book.dto';
import { BookQueryDto } from './dto/book.query.dto';
import { Schema } from 'mongoose';
import { Controller, Post, Put, Get,Body, Param, UsePipes, ValidationPipe,HttpException,HttpStatus} from '@nestjs/common';
import { BookEntity } from './interfaces/book.entity.interface';
import { BaseController } from './../base/base.controller';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';
import {BookCustomService} from './services/book.custom.service';


@Controller('book')
export class BooksController extends BaseController<BookEntity> {

  private readonly _bookService: BooksService;
  constructor(booksService: BooksService, private readonly _bookCustomService: BookCustomService){
    super(booksService);
    this._bookService = booksService;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() bookDto: CreateBookDto) {

    //let status = await this._bookCustomService.validateAuthors(bookDto); //throws an HTTPException if validation fails
    //status = await this._bookCustomService.validateCategories(bookDto); //throws an HTTPException if validation fails
    //let nBookDto: BookDto = await this._bookCustomService.saveForeignEntities(bookDto);

    let nBookDto: BookDto = await this._bookCustomService.preSaveHook(bookDto);
    return await this._bookService.createNewBook(nBookDto);
    
  }

  @Get(':id/populate')
  protected async findOneByIdAndPopulate(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId) {

      let query: BookQueryDto = {
        _id: id
      }
      
      let entity: BookEntity = await this._bookService.fetchBookWithPopulation(query);
      if(entity){
        return entity;
      }
      throw new HttpException(`Item with id: ${id} does not exist`,HttpStatus.NOT_FOUND);
  };

  @Put(':id')
  public async updateItem(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId, @Body(new ValidationPipe({ transform: true })) bookDto: UpdateBookDto) {
      let entity: BookEntity = await this._service.findOneById(id);
      if(entity == null){
        throw new HttpException(`Item with id: ${id} does not exist`,HttpStatus.NOT_FOUND);
      }
      let nBookDto: BookDto = await this._bookCustomService.preSaveHook(bookDto);
      return await this._bookService.updateBook(id,nBookDto);
  }
}