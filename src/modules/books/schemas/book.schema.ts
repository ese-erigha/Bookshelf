import {Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
let BookSchema = new Schema({
    title: String,
    isbn: String,
    pageCount: Number,
    thumbnailUrl: String,
    publishedDate: Date,
    longDescription: String,
    status: String,
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    authors: [{type: Schema.Types.ObjectId, ref: 'Author'}]
},{ bufferCommands: false , timestamps:true});

BookSchema.plugin(mongoosePaginate);

export {BookSchema};