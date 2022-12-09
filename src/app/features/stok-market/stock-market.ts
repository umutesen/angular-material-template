import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewExRoutingModule } from './stock-market-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockMarketListComponent } from './stock-market-list/stock-market-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { FilterComponent } from './filter/filter.component';

@NgModule({
    imports: [
        CommonModule,
        ViewExRoutingModule,
        SharedModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
     
    ],
    declarations: [
        StockMarketListComponent,
        FilterComponent
    ]
})
export class StockMarketModule { }
