import { Schema} from "mongoose";
import { IBaseSchema } from "./interfaces/IBaseSchema";

export class BaseSchema implements IBaseSchema{
    
    getSchema(): Schema{

         let baseSchema: Schema = new Schema({
            id: String
         });
         return baseSchema;
    }
};