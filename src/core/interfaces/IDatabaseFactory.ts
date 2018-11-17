import { IEntityModel } from './../../model/interfaces/IEntityModel';
import { Model} from "mongoose";

export interface IDatabaseFactory{
    connect(schemaName: string) : Model<IEntityModel>;
}