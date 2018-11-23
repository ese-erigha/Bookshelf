import { BaseEntity, BaseDto } from '../../../src/modules/base/interfaces';
import { IBaseRepository } from "./interfaces";
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T>{

    protected readonly _dbSet: Model<T>;

    constructor(dbSet: Model<T>){
        this._dbSet = dbSet;
    }

    public async create(item: BaseDto): Promise<T> {
        const createdEntity = new this._dbSet(item);
        return await createdEntity.save();
    };

    public async update(id: string, item: BaseDto): Promise<T> {
        return await this._dbSet.findByIdAndUpdate(id,item,{new: true}).lean().exec();
    };

    public async findAll(): Promise<T[]> {
        return await this._dbSet.find().lean().exec();
    };

    public async findOneById(id: string): Promise<T> {
        return await this._dbSet.findById(id).lean().exec();
    };

    public async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    };
    
};