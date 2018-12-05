import { BaseRepository } from '../base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './interfaces/user.entity.interface';
import { BaseModel } from '../base/interfaces/base.model.interface';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {

  constructor(@InjectModel('User') userDBSet: BaseModel<UserEntity>) {
    super(userDBSet)
  }
}