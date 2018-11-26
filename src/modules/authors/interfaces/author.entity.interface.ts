import { BaseEntity } from "../../../../src/modules/base/interfaces";

export interface AuthorEntity extends BaseEntity{
    readonly fullName: string;
};