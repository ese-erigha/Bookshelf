import { IReadable, IWritable } from './index';
import { IEntityModel } from 'model/entity/interfaces/index';

export interface IGenericRepository<T> extends IWritable<IEntityModel>, IReadable<IEntityModel>{

};