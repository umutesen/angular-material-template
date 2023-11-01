import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutNoSidebarComponent } from 'src/app/shared/layout-no-sidebar/layout-no-sidebar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutNoSidebarComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
