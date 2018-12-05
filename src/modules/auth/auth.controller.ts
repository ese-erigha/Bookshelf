import { Schema } from 'mongoose';
import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto,CreateAdminDto} from '../users/dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';
import { ApplicationRoles } from './../base/roles';
import { LoginUserDto } from './../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){
    
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async signUp(@Body() userDto: CreateUserDto) {
      //implement signup in service
      userDto.roles.push(ApplicationRoles.User);
      return await this.authService.signUp(userDto);
  }


  @Post('signup/admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async signUpAdmin(@Body() userDto: CreateAdminDto) {
      //implement signup in service
      return await this.authService.signUp(userDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() userDto: LoginUserDto) {
      //implement sigin in service
      return await this.authService.signIn(userDto);
  }

//   @Put(':id')
//   public async updateItem(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId, @Body(new ValidationPipe({ transform: true })) updateDto: UpdateUserDto) {
//       //return await this.update(id,updateDto);
//   }
}