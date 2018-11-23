import { IReadable } from "./IReadable.interface";
import { IWritable } from "./IWritable.interface";

export interface IBaseRepository<T> extends IReadable<T>, IWritable<T>{
    
}