import { BaseEntity } from "../../../../src/modules/base/interfaces";

export interface UserEntity extends BaseEntity{
    email: string,
    password: string,
    roles: Array<string>
};