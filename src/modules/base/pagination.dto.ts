import { BaseDto } from './base.dto';
export class PaginationDto extends BaseDto{

    private readonly maxPageSize: number = 20;
    private _page: any = 1;
    private _limit: any = 1;

    get page(): number{

        return parseInt(this._page);
    }

    set page(value: number){
        this._page = value;
    }

    get limit(): number{
        return parseInt(this._limit);
    }

    set limit(value: number){
        this._limit = (value > this.maxPageSize) ? this.maxPageSize : value;
    }

    
}