import { UserDto } from './user.dto';
import {IsString, Validate, MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import { IsUserAlreadyExist } from './../validators/IsUserAlreadyExist';

export class CreateUserDto extends UserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    @Validate(IsUserAlreadyExist,{message: "User already exist"})
    readonly email: string;

    roles: Array<string> = [];
}