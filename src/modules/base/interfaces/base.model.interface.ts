import { PaginateModel, Document} from 'mongoose';
export interface BaseModel<T extends Document> extends PaginateModel<T> {}