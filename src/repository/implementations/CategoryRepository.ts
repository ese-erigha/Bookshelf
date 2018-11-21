import { ModelTypes } from './../../model/modelTypes';
import { ICategoryModel } from './../../model/entity/interfaces/index';
import { GenericRepository } from "./index";
import {injectable} from 'inversify';
import { ICategoryRepository } from '../../repository/interfaces';

@injectable()
export class CategoryRepository extends GenericRepository<ICategoryModel> implements ICategoryRepository{

    constructor(){

        super(ModelTypes.Author);
    }
}