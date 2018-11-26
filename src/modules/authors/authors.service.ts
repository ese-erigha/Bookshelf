import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { AuthorEntity } from './interfaces/author.entity.interface';
import { AuthorsRepository } from './authors.repository';


@Injectable()
export class AuthorsService extends BaseService<AuthorEntity> {

  constructor(authorRepository: AuthorsRepository) {
    super(authorRepository);
  }

}