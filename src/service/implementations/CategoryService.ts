import { RepositoryType } from './../../core/types/index';
import { ICategoryRepository } from './../../repository/interfaces/index';
import { EntityService } from "./index";
import { ICategoryModel } from "../../model/entity/interfaces/index";
import { injectable, inject } from "inversify";



@injectable()
export class CategoryService extends EntityService<ICategoryModel>{

    private _categoryRepository: ICategoryRepository;

    constructor(
        @inject(RepositoryType.ICategoryRepository) categoryRepository: ICategoryRepository
    ){

      super(categoryRepository);
      this._categoryRepository = categoryRepository;
    }
};