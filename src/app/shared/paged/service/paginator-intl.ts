import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";

@Injectable()
export class MatPaginatorLocalized extends MatPaginatorIntl {
    override itemsPerPageLabel = $localize`:@@paged.label.items-per-page:Items per page`;
    override nextPageLabel = $localize`:@@paged.label.next-page:Next page`;
    override previousPageLabel = $localize`:@@paged.label.previous-page:Previous page`;

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return this.buildRangeLabel(length, startIndex, endIndex);
    };

    private buildRangeLabel(length: number, startIndex: number = 0, endIndex: number = 0) {
        return $localize`:@@paged.label.range:${startIndex + 1} - ${endIndex} of ${length}`;
    }
}