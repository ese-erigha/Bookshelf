import { IGenericRepository } from './../interface/IGenericRepository';

export abstract class GenericRepository<T> implements IGenericRepository<T>{

    create(item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    };

    findOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    };
};