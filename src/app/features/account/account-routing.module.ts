import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountPageComponent} from './account-page/account-page.component';
import {LayoutComponent} from "../../shared/layout/layout.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'profile', component: AccountPageComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {

}
