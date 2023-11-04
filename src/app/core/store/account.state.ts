import {
  State,
  Selector,
  Action,
  StateContext,
  Select,
  createSelector,
} from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';

import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Account } from '../model/account';

export namespace AccountActions {
  

  export class selectAccount {
    public static readonly type = '[Account Result] Select Account';
    constructor(public selectedAccount: Account) {}
  }
}

export interface AccountStateModel {
  selectedAccount: Account;
}

@State({
  name: 'accounts',
  defaults: {
    filterTags: [],
  },
})
@Injectable()
export class AccountState {
  @Selector()
  static selectedAccount(state: AccountStateModel): Account {
    return state.selectedAccount || '';
  }
  constructor() {}

  @Action(AccountActions.selectAccount)
  selectAccount(
    { setState }: StateContext<AccountStateModel>,
    {selectedAccount}: AccountActions.selectAccount
  ) {
    
      setState(patch({ selectedAccount }));
    
    
  }

  
}
