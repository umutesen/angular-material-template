import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginCreateComponent } from './login-create/login-create.component';

import { LoginComponent } from './login/login.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'password-reset-request', component: PasswordResetRequestComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'login-create', component: LoginCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
