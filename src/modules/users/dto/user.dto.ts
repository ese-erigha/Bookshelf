import { BaseDto } from '../../base/base.dto';
import {IsString, MinLength, IsNotEmpty,IsArray} from 'class-validator';


export class UserDto extends BaseDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string;
}