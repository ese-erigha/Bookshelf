import { BaseDto } from './../../base/base.dto';
import {IsString, MinLength, IsNotEmpty}  from 'class-validator';

export class UpdateCategoryDto extends BaseDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name: string;
}