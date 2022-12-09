import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewExRoutingModule } from './cur-market-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {CurMarketListComponent } from './cur-market-list/cur-market-list.component';

@NgModule({
    imports: [
        CommonModule,
        ViewExRoutingModule,
        SharedModule
    ],
    declarations: [
        CurMarketListComponent
    ]
})
export class CurMarketModule { }
