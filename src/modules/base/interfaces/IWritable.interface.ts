import { BaseDto } from './../base.dto';

export interface IWritable<T>{
    create(item: BaseDto) : Promise<T>;
    update(id: string, item: BaseDto): Promise<T>;
    delete(id: string): Promise<boolean>;
}