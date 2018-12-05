import { UserDto } from './user.dto';
import {IsString, MinLength, IsNotEmpty, IsEmail} from 'class-validator';

export class UpdateUserDto extends UserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    readonly email: string;
}