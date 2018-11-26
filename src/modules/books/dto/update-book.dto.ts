import { BookDto } from './book.dto';
import {IsString, MinLength,IsNotEmpty} from 'class-validator';

export class UpdateBookDto extends BookDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly title: string;
}