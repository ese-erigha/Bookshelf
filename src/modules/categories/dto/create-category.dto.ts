import { BaseDto } from './../../base/base.dto';
import {IsString, Validate, MinLength, IsNotEmpty} from 'class-validator';
import { IsCategoryAlreadyExist } from './../validators/IsCategoryAlreadyExist';

export class CreateCategoryDto extends BaseDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @Validate(IsCategoryAlreadyExist)
    readonly name: string;
}