import { BaseEntity } from "../../../../src/modules/base/interfaces";

export interface CategoryEntity extends BaseEntity{
    readonly name: string;
};