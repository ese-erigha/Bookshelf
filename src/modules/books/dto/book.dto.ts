import moment from 'moment';
import { BaseDto } from './../../base/base.dto';
import { AuthorDto } from './../../authors/dto/author.dto';
import {IsString, IsNumber, IsUrl, IsDateString, MaxDate, MinLength,IsNotEmpty, IsIn, IsArray} from 'class-validator';
import {Exclude} from 'class-transformer';

export class BookDto extends BaseDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly isbn: string;

    @IsNumber()
    @IsNotEmpty()
    readonly pageCount: number;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @IsUrl()
    readonly thumbnailUrl: string;

    @IsNotEmpty()
    @IsDateString()
    @MaxDate(moment().add(1, 'days').toDate())
    readonly publishedDate: Date;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly longDescription: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsIn(["published","unpublished"])
    readonly status: string;

    @IsNotEmpty()
    @IsArray()
    @Exclude()
    readonly existingCategories: string[];

    @IsArray()
    @Exclude()
    readonly newCategories: string[];

    @IsNotEmpty()
    @IsArray()
    @Exclude()
    readonly existingAuthors: AuthorDto[];

    @IsArray()
    @Exclude()
    readonly newAuthors: AuthorDto[];

}