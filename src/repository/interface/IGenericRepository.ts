import { IReadable } from './IReadable';
import { IWritable } from './IWritable';

export interface IGenericRepository<T> extends IWritable<T>, IReadable<T>{

};