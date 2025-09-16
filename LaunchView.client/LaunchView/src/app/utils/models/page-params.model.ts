export interface PageParams{
    pageIndex: number;
    pageSize: number;
    sort?: string;
    order?: 'asc' | 'desc';
    filter?: string
}