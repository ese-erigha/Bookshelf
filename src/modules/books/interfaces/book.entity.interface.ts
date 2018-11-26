import { BaseEntity } from "../../../../src/modules/base/interfaces";
import {Schema} from 'mongoose';

export interface BookEntity extends BaseEntity{
    title: string,
    isbn: string,
    pageCount: number,
    thumbnailUrl: string,
    publishedDate: Date,
    longDescription: string,
    status: string,
    categories: Schema.Types.ObjectId[],
    authors: Schema.Types.ObjectId[]
};