import { CreateBookDto } from './../dto/create-book.dto';
import { BookEntity } from './book.entity.interface';
import { IBaseRepository } from "src/modules/base/interfaces";

export interface IBookRepository<T> extends IBaseRepository<BookEntity>{
    
    createNewBook(bookDto: CreateBookDto): Promise<T>;
}