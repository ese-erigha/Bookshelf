import { IEntityService } from './../service/interfaces/index';
import { ServiceType } from './../core/types/index';
import { injectable, inject } from 'inversify';
import { IEntityModel } from 'model/entity/interfaces/index';

@injectable()
export class GenericController<T extends IEntityModel>{
    
    private _entityService: IEntityService<T>;

    constructor(
        @inject(ServiceType.IEntityService) entityService: IEntityService<T>
    ){
        this._entityService = entityService;
    }

    public async findAll(): Promise<IEntityModel[]>{

        try{

            const entities: IEntityModel[] = await this._entityService.findAll();
            return entities;

        }catch(err){
            throw err;
        }
    }
    
};