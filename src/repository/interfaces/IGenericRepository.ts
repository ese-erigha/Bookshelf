import { IReadable, IWritable } from './index';
import { IEntityModel } from 'model/entity/interfaces/index';
import {Model} from "mongoose";

export interface IGenericRepository<T> extends IWritable<IEntityModel>, IReadable<IEntityModel>{

    getModel(): Promise<Model<IEntityModel>>;

};