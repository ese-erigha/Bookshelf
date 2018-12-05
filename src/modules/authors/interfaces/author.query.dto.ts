import { BaseQueryDto } from '../../base/interfaces/base.query.dto';
export interface AuthorQueryDto extends BaseQueryDto{
    fullName?: string
}