import { Schema } from 'mongoose';
import { Get, Delete, Param, Query, UsePipes, ValidationPipe, HttpStatus, HttpException} from '@nestjs/common';
import { ValidateIdPipe } from './pipes/validate-id.pipe';
import { BaseEntity, BaseDto, IBaseService, PaginatedResult } from '../../../src/modules/base/interfaces';
import {PaginationDto} from './pagination.dto';
import { Roles } from './decorators/roles.decorator';
import { ApplicationRoles } from './roles';


export class BaseController<T extends BaseEntity>{

    protected readonly _service: IBaseService<T>;

    constructor(service: IBaseService<T>){
        this._service = service;
    }

    protected async create(item: BaseDto): Promise<T> {
        return await this._service.create(item);
    };

    protected async update(id: Schema.Types.ObjectId, item: BaseDto): Promise<T> {
        let entity: T = await this._service.findOneById(id);
        if(entity == null){
            throw new HttpException(`Item with id: ${id} does not exist`,HttpStatus.NOT_FOUND);
        }
        return await this._service.update(id,item);
    };

    @Get()
    @Roles(ApplicationRoles.Admin,ApplicationRoles.User)    
    @UsePipes(new ValidationPipe({ transform: true }))
    protected async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResult<T>> {
        return await this._service.findAll(paginationDto);
    };

    @Get(':id')
    protected async findOneById(@Param('id', ValidateIdPipe) id: Schema.Types.ObjectId) {
        let entity: T = await this._service.findOneById(id);
        if(entity){
            return entity;
        }
        throw new HttpException(`Item with id: ${id} does not exist`,HttpStatus.NOT_FOUND);
    };

    @Delete(':id')
    protected async delete(@Param('id') id: Schema.Types.ObjectId): Promise<boolean> {
        return await this._service.delete(id); 
    };
};