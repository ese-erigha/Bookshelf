import { BookQueryDto } from './../dto/book.query.dto';
import { CreateBookDto, UpdateBookDto } from './../dto';
import { BookEntity } from './book.entity.interface';
import { IBaseRepository } from "src/modules/base/interfaces";
import {Schema} from 'mongoose';

export interface IBookRepository<T> extends IBaseRepository<BookEntity>{
    
    createNewBook(bookDto: CreateBookDto): Promise<T>;

    fetchBookWithPopulation(cond: BookQueryDto): Promise<T>;

    updateBook(id: Schema.Types.ObjectId ,bookDto: UpdateBookDto): Promise<T>;
}