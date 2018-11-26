import { BaseDto } from './../../base/base.dto';
import {IsString, MinLength, IsNotEmpty} from 'class-validator';

export class UpdateAuthorDto extends BaseDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly fullName: string;
}