import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
import { UsersService } from './../users.service';
import { Injectable } from '@nestjs/common';
import { UserQueryDto } from './../dto/user.query.dto';
import { UserEntity } from './../interfaces/user.entity.interface';


@ValidatorConstraint({name: 'isUserAlreadyExist', async: true})
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface{

  constructor(protected readonly userService: UsersService){}

  async validate(text: string, validationArguments:ValidationArguments){

    let query: UserQueryDto = {
        email: text
    }
       
    const user: UserEntity = await this.userService.findOne(query);
    return user ? false : true;
  }
}

  
