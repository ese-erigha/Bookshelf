import { IEntityModel } from "model/entity/interfaces/IEntityModel";
import {Schema} from 'mongoose';

export interface IWritable<T extends IEntityModel> {
    create(item: T): Promise<any>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
};