import { ModelTypes } from './../../model/modelTypes';
import { IAuthorModel } from './../../model/entity/interfaces/index';
import { GenericRepository } from "./index";
import {injectable} from 'inversify';
import { IAuthorRepository } from '../../repository/interfaces';

@injectable()
export class AuthorRepository extends GenericRepository<IAuthorModel> implements IAuthorRepository{

    constructor(){

        super(ModelTypes.Author);
    }
}