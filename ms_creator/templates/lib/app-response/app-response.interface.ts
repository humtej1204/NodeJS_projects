export interface IAppResponse<T> {
    data?: IAppData<T>;
    success: boolean;
    kindMessage?: string;
}

export interface IAppData<T> {
    item?: T;
    items?: T[];
    itemsCounter?: number;
    pagination?: Pagination;
}

export interface Pagination {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
}