import { Schema } from 'mongoose';
import { IBookService } from './interfaces/IBook.service';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './interfaces/book.entity.interface';
import { BooksRepository } from './books.repository';
import {BookDto, CreateBookDto, BookQueryDto, UpdateBookDto } from './dto';



@Injectable()
export class BooksService extends BaseService<BookEntity> implements IBookService<BookEntity> {

  private readonly _bookRepository: BooksRepository;
  constructor(bookRepository: BooksRepository) {
    super(bookRepository);
    this._bookRepository = bookRepository;
  }

  public async createNewBook(bookDto: BookDto): Promise<BookEntity>{
      return await this._bookRepository.createNewBook(bookDto);
  }

  public async fetchBookWithPopulation(cond: BookQueryDto): Promise<BookEntity>{
    return await this._bookRepository.fetchBookWithPopulation(cond);
  }

  public async updateBook(id: Schema.Types.ObjectId ,bookDto: BookDto): Promise<BookEntity>{
      return await this._bookRepository.updateBook(id,bookDto);
  }

}