import { classToPlain } from 'class-transformer';
import { BaseQueryDto } from './interfaces/base.query.dto';
import { Schema } from 'mongoose';
import { BaseEntity, BaseDto, BaseModel, PaginatedResult } from '../../../src/modules/base/interfaces';
import { IBaseRepository } from "./interfaces";
import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';
import { Session } from 'inspector';

@Injectable()
export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T>{

    protected readonly _dbSet: BaseModel<T>;

    constructor(dbSet: BaseModel<T>){
        this._dbSet = dbSet;
    }

    public async create(item: BaseDto): Promise<T> {
        
        const createdEntity = new this._dbSet(item);
        return await createdEntity.save();
    };

    public async update(id: Schema.Types.ObjectId, item: BaseDto): Promise<T> {
        return await this._dbSet.findByIdAndUpdate(id,item,{new: true}).lean().exec();
    };

    public async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<T>> {
        
        let paginationOptions = {

            page: paginationDto.page,
            limit: paginationDto.limit,
            leanWithId: true
        };
        let result: PaginatedResult<T>  = await this._dbSet.paginate({},paginationOptions);
        result.hasNext = result.page < result.pages;
        result.hasPrevious = result.page > 1;
        return result;
                               
    };

    public async findOneById(id: Schema.Types.ObjectId): Promise<T> {
        return await this._dbSet.findOne({'_id': id}).lean().exec();
    };

    public async delete(id: Schema.Types.ObjectId): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    public async findOne(cond: BaseQueryDto): Promise<T>{
        let query = classToPlain(cond);
        return await this._dbSet.findOne(query).lean().exec();
    }
    
};