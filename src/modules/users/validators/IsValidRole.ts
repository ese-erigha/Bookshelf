import { ApplicationRoles } from './../../base/roles';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
import { Injectable } from '@nestjs/common';


  @ValidatorConstraint({name: 'isValidRole', async: true})
  @Injectable()
  export class IsValidRole implements ValidatorConstraintInterface{

    constructor(){}

    async validate(roles: Array<string>, validationArguments:ValidationArguments){

        return roles.every((role)=>{
            return Object.keys(ApplicationRoles).map((key)=> ApplicationRoles[key]).indexOf(role) > -1;
        });
    }
  }

  
