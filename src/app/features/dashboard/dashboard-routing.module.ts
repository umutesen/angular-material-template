import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {LayoutComponent} from "../../shared/layout/layout.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: DashboardHomeComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}
