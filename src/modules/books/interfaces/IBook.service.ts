import { CreateBookDto } from './../dto/create-book.dto';
import { BookEntity } from './book.entity.interface';
import { IBaseService } from '../../base/interfaces';


export interface IBookService<T> extends IBaseService<BookEntity>{
    
    createNewBook(bookDto: CreateBookDto): Promise<T>;
}