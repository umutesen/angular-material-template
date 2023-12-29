import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule as AccountsRoutingModule } from './account-routing.module';
import { AccountHomeComponent } from './account-home/account-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { EditAccountDialogComponent } from './edit-account-dialog/edit-account-dialog.component';
import { AccountUsersComponent } from './account-users/account-users.component';

@NgModule({
    imports: [
        CommonModule,
        AccountsRoutingModule,
        SharedModule,
        MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
        AccountHomeComponent, EditAccountDialogComponent, AccountUsersComponent
    ]
})
export class    AccountsModule { }
