import { BaseQueryDto } from './interfaces/base.query.dto';
import { Schema } from 'mongoose';
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

    public async update(id: Schema.Types.ObjectId, item: BaseDto): Promise<T> {
        return await this._repository.update(id,item);
    };

    public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<T>> {
        return await this._repository.findAll(paginationDto);
    };

    public async findOneById(id: Schema.Types.ObjectId): Promise<T> {
        return await this._repository.findOneById(id);
    };

    public async delete(id: Schema.Types.ObjectId): Promise<boolean> {
        return await this._repository.delete(id); 
    };

    public async findOne(cond: BaseQueryDto): Promise<T>{
        return await this._repository.findOne(cond);
    }
    
};