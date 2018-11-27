import { Schema } from 'mongoose';
import { BaseDto } from './../../base/base.dto';

export class CategoryDto extends BaseDto{

    public id?: Schema.Types.ObjectId;
    public name: string;
}