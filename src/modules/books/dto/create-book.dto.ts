import { BookDto } from './book.dto';
import {IsString, Validate, MinLength, IsNotEmpty} from 'class-validator';
import { IsBookAlreadyExist } from './../validators/IsBookAlreadyExist';

export class CreateBookDto extends BookDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @Validate(IsBookAlreadyExist)
    readonly title: string;

}