
import { UserEntity } from './../../users/interfaces/user.entity.interface';
import { UserQueryDto } from './../../users/dto';
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from './../../users/users.service';
import * as jwt from 'jsonwebtoken';
import {Request} from 'express';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const appRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!appRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request,appRoles)
    
  }

  async validateRequest(request: Request, appRoles:string[]){

    let payload = jwt.decode(request["token"]);

    if(payload && payload["email"]){
      let userQueryDto: UserQueryDto = {
        email: payload["email"]
      };

      let user: UserEntity = await this.userService.findOne(userQueryDto);
      const hasRole = () => user.roles.some((role) => appRoles.includes(role));
      let state = user && user.roles && hasRole();

      if(!state){
        throw new HttpException("Access not granted to this resource", HttpStatus.FORBIDDEN);
      }else{
        return state;
      }

    }else{
      throw new HttpException("Role validation failed", HttpStatus.BAD_REQUEST);
    }
    
  }
}