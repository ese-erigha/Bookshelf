import { UpdateBookDto } from './../dto/update-book.dto';
import { Schema } from 'mongoose';
import { CreateBookDto, BookQueryDto } from './../dto';
import { BookEntity } from './book.entity.interface';
import { IBaseService } from '../../base/interfaces';


export interface IBookService<T> extends IBaseService<BookEntity>{
    
    createNewBook(bookDto: CreateBookDto): Promise<T>;
    fetchBookWithPopulation(cond: BookQueryDto): Promise<T>;
    updateBook(id: Schema.Types.ObjectId ,bookDto: UpdateBookDto): Promise<T>;
}