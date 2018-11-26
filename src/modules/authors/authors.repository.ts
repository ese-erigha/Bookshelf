import { BaseRepository } from '../base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorEntity } from './interfaces/author.entity.interface';
import { BaseModel } from '../base/interfaces/base.model.interface';


@Injectable()
export class AuthorsRepository extends BaseRepository<AuthorEntity> {

  constructor(@InjectModel('Author') authorDBSet: BaseModel<AuthorEntity>) {
    super(authorDBSet)
  }
}