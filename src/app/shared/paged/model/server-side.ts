import {DataSource} from "@angular/cdk/table";
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, Observable} from "rxjs";
import {PagedRequest} from "./paged-request";
import {map} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Page} from "./paged-response";
import {PagedService} from "../service/paged.service";

/**
 * Data source that accepts a server-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * {@link https://material.angular.dev/guide/getting-started}
 */
export class MatServerSideTableDataSource<T extends object | any, P extends MatPaginator = MatPaginator, S extends MatSort = MatSort> extends DataSource<T> {
    /**
     * Instance of the paginator component used by the table to control what page of the data is
     * displayed. PagedRequest changes emitted by the paginator will trigger an update to the
     * table's rendered data.
     *
     * Note that the data source uses the paginator's properties to calculate which page of data
     * should be displayed. If the paginator receives its properties as template inputs,
     * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
     * initialized before assigning it to this data source.
     */
    paginator: P | undefined;

    /**
     * Instance of the MatSort directive used by the table to control its sorting. Sort changes
     * emitted by the MatSort will trigger an update to the table's rendered data.
     */
    sort: S | undefined;

    /**
     * Instance of PagedRequest, that contains backend call parameters :
     * <ul>
     *     <li>page size</li>
     *     <li>page index</li>
     *     <li>sort direction (asc or desc)</li>
     *     <li>sort column</li>
     *     <li>filter</li>
     * </ul>
     */
    pagedRequest: PagedRequest;

    /**
     * Backend response Page, that contains data length.
     */
    page: Page | undefined;

    constructor(private pagedService: PagedService<T>, private endPoint: string) {
        super();
        this.pagedRequest = new PagedRequest();
    }

    /**
     * Stream emitting render data to the table (depends on ordered data changes).
     * */
    private _dataStream: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    get dataStream(): T[] {
        return this._dataStream.value;
    }

    set dataStream(dataStream: T[]) {
        this._dataStream.next(dataStream);
        new MatTableDataSource(dataStream);
    }

    public init(paginator: P, sort: S) {
        this.paginator = paginator;
        this.sort = sort;
    }

    /**
     * Used by the MatTable. Called when it connects to the data source.
     */
    connect(): Observable<T[]> {
        return this._dataStream.asObservable();
    }

    /**
     * Used by the MatTable. Called when it disconnects from the data source.
     */
    disconnect(): void {
        this._dataStream.complete();
    }

    /**
     * Backend call with paged, sorted, and filtered parameters :
     * <ul>
     *     <li>page size</li>
     *     <li>page index</li>
     *     <li>sort direction (asc or desc)</li>
     *     <li>sort column</li>
     *     <li>filter</li>
     * </ul>
     */
    loadData(): Observable<boolean> {
        return this.pagedService.findAllFilterBy(this.endPoint, this.pagedRequest)
            .pipe(
                map((response) => {
                    this.page = response.page;
                    if (this.paginator) {
                        this.paginator.pageIndex = this.page.number;
                        this.paginator.pageSize = this.page.size;
                        this.paginator.length = this.page.totalElements;
                    }
                    if (this.sort) {
                        this.sort.direction = this.pagedRequest.sortDirection;
                        this.sort.active = this.pagedRequest.sortColumn;
                    }
                    this.dataStream = response.content;
                    return true;
                }),
            );
    }
}
