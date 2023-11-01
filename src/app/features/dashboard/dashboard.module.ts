import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditAccountDialogComponent } from './edit-account-dialog/edit-account-dialog.component';

@NgModule({
    declarations: [DashboardHomeComponent, EditAccountDialogComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule
    ]
})
export class    DashboardModule { }
