import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {MatIcon} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [DashboardHomeComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatIcon
    ]
})
export class DashboardModule {

}
