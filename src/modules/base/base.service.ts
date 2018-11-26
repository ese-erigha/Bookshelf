import { BaseEntity, BaseDto, IBaseRepository, PaginatedResult } from '../../../src/modules/base/interfaces';
import { IBaseService } from "./interfaces";
import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';


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

    public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<T>> {
        return await this._repository.findAll(paginationDto);
    };

    public async findOneById(id: string): Promise<T> {
        return await this._repository.findOneById(id);
    };

    public async delete(id: string): Promise<boolean> {
        return await this._repository.delete(id); 
    };

    public async findOne(cond:object): Promise<T>{
        return await this._repository.findOne(cond);
    }
    
};