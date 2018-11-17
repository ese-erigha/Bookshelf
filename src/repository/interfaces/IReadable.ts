import { IEntityModel } from "model/entity/interfaces/index";

export interface IReadable<T extends IEntityModel> {
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T>;
};