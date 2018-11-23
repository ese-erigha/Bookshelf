import { Get, Delete, Param} from '@nestjs/common';
import { BaseEntity, BaseDto, IBaseService } from '../../../src/modules/base/interfaces';

export class BaseController<T extends BaseEntity>{

    protected readonly _service: IBaseService<T>;

    constructor(service: IBaseService<T>){
        this._service = service;
    }

    public async create(item: BaseDto): Promise<T> {
        
        return await this._service.create(item);
    };

    public async update(id: string, item: BaseDto): Promise<T> {
        return await this._service.update(id,item);
    };

    @Get()
    public async findAll(): Promise<T[]> {
        return await this._service.findAll();
    };

    @Get(':id')
    public async findOneById(@Param('id') id: string): Promise<T> {
        return await this._service.findOneById(id);
    };

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<boolean> {
        return await this._service.delete(id); 
    };  
};