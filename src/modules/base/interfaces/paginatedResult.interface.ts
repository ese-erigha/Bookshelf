export interface PaginatedResult<T> {
    docs: Array<T>;
    total: number;
    limit: number;
    page?: number;
    pages?: number;
    offset?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
}