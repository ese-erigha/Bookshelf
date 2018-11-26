import { CreateBookDto } from './dto/create-book.dto';
import { IBookRepository } from './interfaces/IBook.repository';
import { BaseRepository } from '../base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookEntity } from './interfaces/book.entity.interface';
import { BaseModel } from '../base/interfaces/base.model.interface';
import {classToPlain} from 'class-transformer';


@Injectable()
export class BooksRepository extends BaseRepository<BookEntity> implements IBookRepository<BookEntity> {

  constructor(@InjectModel('Book') bookDBSet: BaseModel<BookEntity>) {
    super(bookDBSet);
  }

  public async createNewBook(bookDto: CreateBookDto): Promise<BookEntity>{
    
    //Need to save new Authors and New Categories before saving book
    const dto = classToPlain(bookDto);
    let bookEntity: BookEntity = new this._dbSet(dto);
    
    
    
    throw new Error(); //implement custom create function
  }
}