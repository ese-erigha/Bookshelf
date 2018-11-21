import { IEntityModel } from './../../model/entity/interfaces/index';
import { Model} from "mongoose";

export interface IDatabaseFactory{
    connect(schemaName: string) : Promise<Model<IEntityModel>>;
}