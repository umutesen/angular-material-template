import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedRequest} from "../model/paged-request";
import {inject, Injectable} from "@angular/core";
import {PagedResponse} from "../model/paged-response";

@Injectable({
    providedIn: 'root',
})
export class PagedService<T> {
    private http: HttpClient = inject(HttpClient);

    public findAllFilterBy(endPoint: string, pagedRequest: PagedRequest): Observable<PagedResponse<T>> {
        return this.http
            .get<PagedResponse<T>>('api/' + endPoint, {
                params: {
                    pageIndex: pagedRequest.pageIndex,
                    pageSize: pagedRequest.pageSize,
                    sortDirection: pagedRequest.sortDirection,
                    sortColumn: pagedRequest.sortColumn,
                    filter: pagedRequest.filter == null ? '' : pagedRequest.filter,
                },
            });
    }
}
