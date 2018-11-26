import { PaginatedResult } from './paginatedResult.interface';
import { PaginationDto } from "../pagination.dto";

export interface IReadable<T>{
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<T>>;
    findOneById(id: string): Promise<T>;
    findOne(cond:object): Promise<T>;
};