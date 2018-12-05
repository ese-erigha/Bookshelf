import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity.interface';
import { UsersRepository } from './users.repository';


@Injectable()
export class UsersService extends BaseService<UserEntity> {

  constructor(userRepository: UsersRepository) {
    super(userRepository);
  }

}