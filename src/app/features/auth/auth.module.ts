import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {PasswordResetRequestComponent} from './password-reset-request/password-reset-request.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/input";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule,
        MatCard,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatFormField,
        MatError,
        SharedModule
    ],
    declarations: [LoginComponent, PasswordResetRequestComponent, PasswordResetComponent]
})
export class AuthModule {

}
