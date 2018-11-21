import { RepositoryType } from './../../core/types/index';
import { IBookRepository } from './../../repository/interfaces/index';
import { EntityService } from "./index";
import { IBookModel } from "../../model/entity/interfaces/index";
import { injectable, inject } from "inversify";


@injectable()
export class BookService extends EntityService<IBookModel>{

    private _bookRepository: IBookRepository;

    constructor(
        @inject(RepositoryType.IBookRepository) bookRepository: IBookRepository
    ){

      super(bookRepository);
      this._bookRepository = bookRepository;
    }
};