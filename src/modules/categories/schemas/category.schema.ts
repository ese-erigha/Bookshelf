import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

export const CategorySchema = new mongoose.Schema({
    name: String,
},{ bufferCommands: false , timestamps:true}).plugin(mongoosePaginate);

//CategorySchema.plugin(mongoosePaginate);
//export default CategorySchema;