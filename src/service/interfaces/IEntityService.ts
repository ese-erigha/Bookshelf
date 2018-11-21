import {IReadable, IWritable } from "../../repository/interfaces/index";
import { IEntityModel } from "../../model/entity/interfaces/index";

export interface IEntityService<T> extends IWritable<IEntityModel>, IReadable<IEntityModel>{

};