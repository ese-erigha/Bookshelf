import { IBookModel } from './../../model/entity/interfaces/index';
import { IBookRepository } from './../interfaces/IBookRepository';
import { ModelTypes } from './../../model/modelTypes';
import { GenericRepository } from "./index";
import { injectable } from 'inversify';

@injectable()
export class BookRepository extends GenericRepository<IBookModel> implements IBookRepository{

    constructor(){

        super(ModelTypes.Author);
    }
}