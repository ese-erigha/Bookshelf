import { RepositoryType } from './../../core/types/index';
import { IAuthorRepository } from './../../repository/interfaces/index';
import { EntityService } from "./index";
import { IAuthorModel } from "../../model/entity/interfaces/index";
import { injectable, inject } from "inversify";



@injectable()
export class AuthorService extends EntityService<IAuthorModel>{

    private _authorRepository: IAuthorRepository;

    constructor(
        @inject(RepositoryType.IAuthorRepository) authorRepository: IAuthorRepository
    ){

      super(authorRepository);
      this._authorRepository = authorRepository;
    }
};