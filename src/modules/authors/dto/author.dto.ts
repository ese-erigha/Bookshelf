import { BaseDto } from './../../base/base.dto';
import {Schema} from 'mongoose';
export class AuthorDto extends BaseDto{

    public id?: Schema.Types.ObjectId;
    public fullName: string;
}