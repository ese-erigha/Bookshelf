import { Schema } from 'mongoose';
import { BaseDto } from './../base.dto';

export interface IWritable<T>{
    create(item: BaseDto) : Promise<T>;
    update(id: Schema.Types.ObjectId, item: BaseDto): Promise<T>;
    delete(id: Schema.Types.ObjectId): Promise<boolean>;
}