import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutNoSidebarComponent } from 'src/app/shared/layout-no-sidebar/layout-no-sidebar.component';
import { AccountHomeComponent } from './account-home/account-home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutNoSidebarComponent,
    children: [
      { path: '', component: AccountHomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
