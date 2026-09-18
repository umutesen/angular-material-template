import {SortDirection} from "@angular/material/sort";

export class PagedRequest {
    pageSize: number;
    pageIndex: number;
    sortDirection: SortDirection;
    sortColumn: string;
    filter: string;

    constructor(pageSize?: number, pageIndex?: number, sortDirection?: SortDirection, sortColumn?: string, filter?: string) {
        this.pageSize = pageSize || 10;
        this.pageIndex = pageIndex || 0;
        this.sortDirection = sortDirection || 'asc';
        this.sortColumn = sortColumn || 'id';
        this.filter = filter || '';
    }
}
