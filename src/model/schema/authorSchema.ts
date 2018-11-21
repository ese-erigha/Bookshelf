import { Schema } from 'mongoose';
import { BaseSchema } from './baseSchema';
const mongoosePaginate = require('mongoose-paginate');

let schema: Schema = new Schema({
    fullName: String
 },
 { bufferCommands: false,
   timestamps: true
 });
 schema.plugin(mongoosePaginate);

export class AuthorSchema extends BaseSchema{

    getSchema(): Schema{
        return schema;
   }
}