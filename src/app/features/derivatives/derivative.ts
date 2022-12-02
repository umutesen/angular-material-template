import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewExRoutingModule } from './derivative-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {DerivativeListComponent } from './derivative-list/derivative-list.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [
        CommonModule,
        ViewExRoutingModule,
        SharedModule,
        MatSortModule,
    ],
    declarations: [
        DerivativeListComponent
    ]
})
export class DerivativeModule { }
