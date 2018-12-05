import { Schema } from 'mongoose';
import { Controller, Post, Put, Body, Param, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthorEntity } from './interfaces/author.entity.interface';
import { BaseController } from './../base/base.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { ValidateIdPipe } from './../base/pipes/validate-id.pipe';

@Controller('author')
export class AuthorsController extends BaseController<AuthorEntity> {

  constructor(authorsService: AuthorsService){
    super(authorsService);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async insert(@Body() authorDto: CreateAuthorDto) {
      return await this.create(authorDto);
  }

  @Put(':id')
  public async updateItem(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId, @Body(new ValidationPipe({ transform: true })) authorDto: UpdateAuthorDto) {
      return await this.update(id,authorDto);
  }
}