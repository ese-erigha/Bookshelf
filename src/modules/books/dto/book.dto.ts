import { CategoryDto } from './../../categories/dto/category.dto';
import { BaseDto } from './../../base/base.dto';
import { AuthorDto } from './../../authors/dto/author.dto';
import {IsString, IsNumber, IsUrl, IsDateString, MinLength,IsNotEmpty, IsIn, IsArray, IsOptional} from 'class-validator';


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
    readonly publishedDate: Date;

    @IsOptional()
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
    existingCategories: Array<CategoryDto>;

    @IsOptional()
    @IsArray()
    readonly newCategories: Array<CategoryDto>;

    @IsNotEmpty()
    @IsArray()
    existingAuthors: Array<AuthorDto>;

    @IsOptional()
    @IsArray()
    readonly newAuthors: Array<AuthorDto>;

}