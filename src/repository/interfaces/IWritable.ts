import { IEntityModel } from "model/interfaces/IEntityModel";

export interface IWritable<T extends IEntityModel> {
    create(item: T): Promise<boolean>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
};