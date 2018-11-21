import { Application } from 'express';
import { IEntityService } from './../service/interfaces/index';
import { ServiceType } from './../core/types/index';
import { injectable, inject } from 'inversify';
import { IEntityModel } from '../model/entity/interfaces/index';
import { RegistrableController } from 'core/registrable.controller';


@injectable()
export class GenericController<T extends IEntityModel> implements RegistrableController{
    
    private _entityService: IEntityService<T>;

    constructor(
        @inject(ServiceType.IEntityService) entityService: IEntityService<T>
    ){
        this._entityService = entityService;
    }

    public register(app: Application): void{

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