import { IReadable } from "./IReadable.interface";
import { IWritable } from "./IWritable.interface";

export interface IBaseService<T> extends IReadable<T>, IWritable<T>{
    
};