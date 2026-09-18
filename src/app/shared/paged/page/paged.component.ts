import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";
import {TableColumn} from "../model/table-column";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {PagedService} from "../service/paged.service";
import {MatServerSideTableDataSource} from "../model/server-side";
import {DataType} from "../../model/data-type";

@Component({
    selector: 'paged-list',
    standalone: false,
    templateUrl: './paged.component.html',
    styleUrls: ['./paged.component.css'],
})
export class PagedComponent<T> implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @Input() pageSizeOptions: number[] = [5, 10, 25];
    showFirstLastButtons: boolean = true;
    uri: string = '';
    columns: TableColumn[] = [];
    dataSource!: MatServerSideTableDataSource<T>;
    loading = true;
    contentTitle!: string;
    protected readonly DataType = DataType;
    private titleService = inject(Title);
    private pagedService = inject(PagedService);
    private route = inject(ActivatedRoute);

    ngOnInit() {
        this.route.data.subscribe(_ => {
            this.titleService.setTitle("Paged List");
            this.contentTitle = "Paged List";
            this.uri = "/api/list";
            this.columns = [new TableColumn("column-1", "Column 1"), new TableColumn("column-2", "Column 2")];
        });
        this.dataSource = new MatServerSideTableDataSource<T>(this.pagedService, this.uri);
    }

    ngAfterViewInit() {
        this.dataSource.init(this.paginator, this.sort);
        this.loadData();
    }

    sortChange(sort: Sort): void {
        this.loadData({sort: sort});
    }

    pageChange(page: PageEvent): void {
        this.loadData({page: page});
    }

    filterChange(event: Event): void {
        this.loadData({event: event});
    }

    displayedColumns(): string[] {
        return this.columns
            .map(column => column.code);
    }

    loadData(options?: {
        page?: PageEvent,
        sort?: Sort,
        event?: Event
    }) {
        this.loading = true;
        if (this.dataSource) {
            if (options) {
                if (options.page) {
                    this.dataSource.pagedRequest.pageSize = options.page.pageSize;
                    this.dataSource.pagedRequest.pageIndex = options.page.pageIndex;
                }

                if (options.sort) {
                    this.dataSource.pagedRequest.sortColumn = options.sort.active;
                    this.dataSource.pagedRequest.sortDirection = options.sort.direction;
                }

                if (options.event) {
                    const filterValue = (options.event.target as HTMLInputElement).value;
                    this.dataSource.pagedRequest.filter = filterValue.trim().toLowerCase();
                }
            }

            this.dataSource.loadData()
                .subscribe({
                    next: (_) => {

                    },
                    error: (error: HttpErrorResponse) => {
                        console.error("An error occurred : ");
                        console.error("     URL : " + error.url);
                        console.error("     Name : " + error.name);
                        console.error("     Headers : " + error.headers);
                        console.error("     Status : " + error.status);
                        console.error("     Redirected : " + error.redirected);
                        console.error("     Type : " + error.type);
                        console.error("     Response type : " + error.responseType);
                        console.error("     OK : " + error.ok);
                        console.error("     Message : " + error.message);
                        console.error("     Error : " + error.error);
                    },
                    complete: () => {
                        this.loading = false;
                    }
                });
        }
    }
}
