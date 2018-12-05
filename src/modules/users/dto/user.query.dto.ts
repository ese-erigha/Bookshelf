import { BaseQueryDto } from './../../base/interfaces/base.query.dto';
export interface UserQueryDto extends BaseQueryDto {
    email?: string,
    password?: string,
    roles?: Array<string>
}