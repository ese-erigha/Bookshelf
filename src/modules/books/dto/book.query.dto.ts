import { BaseQueryDto } from '../../base/interfaces/base.query.dto';
export interface BookQueryDto extends BaseQueryDto{
    title?: string,
    
    isbn?: string;

    pageCount?: number;

    thumbnailUrl?: string;

    publishedDate?: Date;

    longDescription?: string;

    status?: string;
}