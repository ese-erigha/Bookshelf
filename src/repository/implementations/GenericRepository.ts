import { IEntityModel } from './../../model/entity/interfaces/index';
import { IDatabaseFactory } from '../../core/interfaces/IDatabaseFactory';
import { DBType } from './../../core/types/index';
import { IGenericRepository } from '../interfaces/index';
import {injectable, inject} from 'inversify';
import { Model} from "mongoose";



@injectable()
export class GenericRepository<T extends IEntityModel> implements IGenericRepository<T>{

    @inject(DBType.IDatabaseFactory) private _dbFactory: IDatabaseFactory;
    protected _dbSet : Model<IEntityModel>;
    
    public constructor (nameOfModel:string){
        this._dbSet = this._dbFactory.connect(nameOfModel);
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

            return await this._dbSet.find();
        
        }catch(err){
            throw err;
        }
    };

    findOneById(id: string): Promise<IEntityModel> {
        throw new Error("Method not implemented.");
    };
};