import { Schema } from 'mongoose';
import { BaseSchema } from './baseSchema';

let schema: Schema = new Schema({
    id: String
 });

export class AuthorSchema extends BaseSchema{

    getSchema(): Schema{
        return schema;
   }
}