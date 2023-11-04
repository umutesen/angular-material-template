import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './account.state';
import { AccountService } from '../services/account.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([AccountState]),
    HttpClientModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountStateModule { }
