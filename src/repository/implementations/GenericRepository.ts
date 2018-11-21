import { IDatabaseFactory } from './../../core/interfaces/IDatabaseFactory';
import { IEntityModel } from './../../model/entity/interfaces/index';
import { DBType } from './../../core/types/index';
import { IGenericRepository } from '../interfaces/index';
import {injectable, unmanaged} from 'inversify';
import { Model, Schema} from "mongoose";
import {dependencyContainer} from '../../core/dependency.config';



@injectable()
export class GenericRepository<T extends IEntityModel> implements IGenericRepository<T>{

    protected _dbSet : Model<IEntityModel>;
    protected _dbFactory: IDatabaseFactory;
    protected _nameOfModel: string;
    
    public constructor (@unmanaged() nameOfModel:string){
         
        this._dbFactory = dependencyContainer.get<IDatabaseFactory>(DBType.IDatabaseFactory);
        this._nameOfModel = nameOfModel;
    }

    public async getModel(): Promise<Model<IEntityModel>>{
        return await this._dbFactory.connect(this._nameOfModel);
    }

    public async create(item: T): Promise<any> {
      
        try{

            this._dbSet = await this.getModel();
            let doc: IEntityModel = await this._dbSet.create(item);
            return doc._id;

        }catch(err){
            throw err;
        }
    };

    public update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    public delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    public async findAll(): Promise<any> {

        try{

            this._dbSet = await this.getModel();
            let models = await this._dbSet.find().lean().exec();
            return models;
        
        }catch(err){
            throw err;
        }
    };

    public findOneById(id: string): Promise<IEntityModel> {
        throw new Error("Method not implemented.");
    };
};