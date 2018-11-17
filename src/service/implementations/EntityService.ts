import { IEntityService } from './../interfaces/index';
import { IEntityModel } from "model/entity/interfaces/index";
import { injectable, inject } from 'inversify';
import { RepositoryType } from 'core/types/index';
import { IGenericRepository } from 'repository/interfaces/index';

@injectable()
export class EntityService<T extends IEntityModel> implements IEntityService<IEntityModel>{

    protected _repository: IGenericRepository<IEntityModel>;

    constructor(
        @inject(RepositoryType.IGenericRepository) repository: IGenericRepository<IEntityModel>
    ){

        this._repository = repository;
    }

    create(item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    async findAll(): Promise<IEntityModel[]> {
        
        try{

            return await this._repository.findAll();
        }catch(err){
            throw err;
        }
    };

    findOneById(id: string): Promise<IEntityModel> {
        throw new Error("Method not implemented.");
    };

}