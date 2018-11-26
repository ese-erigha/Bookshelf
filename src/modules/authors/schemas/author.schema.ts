import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
let AuthorSchema = new mongoose.Schema({
    fullName: String,
},{ bufferCommands: false , timestamps:true});

AuthorSchema.plugin(mongoosePaginate);

export {AuthorSchema};