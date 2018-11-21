import { Schema } from 'mongoose';
import { BaseSchema } from './baseSchema';
const mongoosePaginate = require('mongoose-paginate');

let schema: Schema = new Schema({
    name: String,
    isbn: String,
    pageCount: Number,
    thumbnailUrl: String,
    publishedDate: Date,
    longDescription: String,
    status: String,
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}]

},{ bufferCommands: false , timestamps:true});
schema.plugin(mongoosePaginate);

export class BookSchema extends BaseSchema{

    getSchema(): Schema{
        return schema;
    }
}