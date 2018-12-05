import { UserDto } from './user.dto';
import {IsString, Validate,IsArray, MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import { IsUserAlreadyExist } from './../validators/IsUserAlreadyExist';
import { IsValidRole } from '../validators/IsValidRole';

export class CreateAdminDto extends UserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    @Validate(IsUserAlreadyExist)
    readonly email: string;


    @IsNotEmpty()
    @IsArray()
    @Validate(IsValidRole)
    readonly roles: Array<string>;
}