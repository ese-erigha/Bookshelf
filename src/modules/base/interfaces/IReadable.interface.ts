import { PaginatedResult } from './paginatedResult.interface';
import { PaginationDto } from "../pagination.dto";
import { BaseQueryDto } from './base.query.dto';
import {Schema} from 'mongoose';

export interface IReadable<T>{
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<T>>;
    findOneById(id: Schema.Types.ObjectId): Promise<T>;
    findOne(cond:BaseQueryDto): Promise<T>;
};