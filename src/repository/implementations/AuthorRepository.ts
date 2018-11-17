import { ModelTypes } from './../../model/modelTypes';
import { IAuthorModel } from './../../model/entity/interfaces/index';
import { GenericRepository } from "./index";
import {injectable} from 'inversify';

@injectable()
export class AuthorRepository extends GenericRepository<IAuthorModel>{

    constructor(){

        super(ModelTypes.Author);
    }
}