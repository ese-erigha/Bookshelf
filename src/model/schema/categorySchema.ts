import { Schema } from 'mongoose';
import { BaseSchema } from './baseSchema';
const mongoosePaginate = require('mongoose-paginate');

let schema: Schema = new Schema({
    name: String
},{ bufferCommands: false , timestamps:true});
schema.plugin(mongoosePaginate);

export class CategorySchema extends BaseSchema{

    getSchema(): Schema{
        return schema;
    }
}