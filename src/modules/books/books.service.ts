import { IBookService } from './interfaces/IBook.service';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { BookEntity } from './interfaces/book.entity.interface';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';


@Injectable()
export class BooksService extends BaseService<BookEntity> implements IBookService<BookEntity> {

  private readonly _bookRepository: BooksRepository;
  constructor(bookRepository: BooksRepository) {
    super(bookRepository);
    this._bookRepository = bookRepository;
  }

  public async createNewBook(bookDto: CreateBookDto): Promise<BookEntity>{
      return await this._bookRepository.createNewBook(bookDto);
  }

}