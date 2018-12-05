import { HttpException, HttpStatus} from '@nestjs/common';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { UserEntity } from './../users/interfaces/user.entity.interface';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserQueryDto } from './../users/dto/user.query.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async signUp(userDto: CreateUserDto): Promise<any>{

    let user: UserEntity = await this.usersService.create(userDto);
    return await user;
  }

  async signIn(userDto: LoginUserDto): Promise<Object> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    let query: UserQueryDto = {
        email:  userDto.email
    };
    let user: UserEntity = await this.usersService.findOne(query);
    if(user){

      let isValidPassword =  await bcrypt.compare(userDto.password, user.password);
      if(isValidPassword){

        let token = jwt.sign(user,`${process.env.SECRET_KEY}`,{
          expiresIn: "24h" // expires in 24 hours
        });
        return {token: token, expiresIn: moment().add('hours',24).toISOString() };
      }
    }
    throw new HttpException("Invalid username or Password",HttpStatus.BAD_REQUEST);
  }
}