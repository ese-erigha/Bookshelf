export interface IReadable<T>{
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T>;
};