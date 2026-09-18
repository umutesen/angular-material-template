import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountPageComponent} from './account-page/account-page.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ProfileDetailsComponent} from './profile-details/profile-details.component';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule,
        MatCard,
        MatCardContent,
        MatTabGroup,
        MatTab,
        NgOptimizedImage
    ],
    declarations: [AccountPageComponent, ChangePasswordComponent, ProfileDetailsComponent],
    exports: [AccountPageComponent]
})
export class AccountModule {

}
