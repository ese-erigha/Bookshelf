import { Schema } from 'mongoose';
import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity.interface';
import { BaseController } from './../base/base.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto} from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';

@Controller('user')
export class UsersController extends BaseController<UserEntity> {

  constructor(usersService: UsersService){
    super(usersService);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() userDto: CreateUserDto) {
      return await this.create(userDto);
  }

  @Put(':id')
  public async updateItem(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId, @Body(new ValidationPipe({ transform: true })) updateDto: UpdateUserDto) {
      return await this.update(id,updateDto);
  }
}