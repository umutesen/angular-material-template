import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerListComponent} from './customer-list/customer-list.component';
import {LayoutComponent} from "../../shared/layout/layout.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: CustomerListComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {

}
