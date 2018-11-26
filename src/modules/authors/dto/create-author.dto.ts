import { BaseDto } from './../../base/base.dto';
import {IsString, Validate, MinLength,IsNotEmpty} from 'class-validator';
import { IsAuthorAlreadyExist } from './../validators/IsAuthorAlreadyExist';

export class CreateAuthorDto extends BaseDto{

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @Validate(IsAuthorAlreadyExist)
    readonly fullName: string;
}