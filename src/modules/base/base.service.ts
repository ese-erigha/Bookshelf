import { BaseEntity, BaseDto, IBaseRepository } from '../../../src/modules/base/interfaces';
import { IBaseService } from "./interfaces";
import { Injectable } from '@nestjs/common';


@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T>{

    protected readonly _repository: IBaseRepository<T>;

    constructor(repository: IBaseRepository<T>){
        this._repository = repository;
    }

    public async create(item: BaseDto): Promise<T> {
        
        return await this._repository.create(item);
    };

    public async update(id: string, item: BaseDto): Promise<T> {
        return await this._repository.update(id,item);
    };

    public async findAll(): Promise<T[]> {
        return await this._repository.findAll();
    };

    public async findOneById(id: string): Promise<T> {
        return await this._repository.findOneById(id);
    };

    public async delete(id: string): Promise<boolean> {
        return await this._repository.delete(id); 
    };
    
};