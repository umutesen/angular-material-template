import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersRoutingModule} from './customers-routing.module';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule,
        MatCard,
        MatCardContent,
        MatTable,
        MatHeaderCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderRow,
        MatSort,
        MatRow
    ],
    declarations: [
        CustomerListComponent
    ]
})
export class CustomersModule {

}
