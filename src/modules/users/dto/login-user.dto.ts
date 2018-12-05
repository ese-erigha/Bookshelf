import { BaseDto } from './../../base/base.dto';
import {IsString, MinLength, IsNotEmpty, IsEmail} from 'class-validator';


export class LoginUserDto extends BaseDto {  

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly password: string;
}