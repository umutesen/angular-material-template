import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/core/model/account';
import { ADMIN } from 'src/app/core/model/roles';
import { User, UserHelper } from 'src/app/core/model/user';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.css']
})
export class EditAccountDialogComponent implements OnInit {
  saving = false;
  isNew = true;
  ownerUser: User;
  accountForm = new FormGroup({
    id: new FormControl(this.data.id),
    name: new FormControl(this.data.name, Validators.required),
    description: new FormControl(this.data.description),
  });

  get name() { return this.accountForm.get('name'); }

  constructor(
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
    private accountService: AccountService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: Account,
  ) {
    if(Object.keys(data).length){
      this.isNew = false;
    }
    authService.user$.subscribe((user) => {
      if(user && user.uid){
        this.ownerUser = UserHelper.getUserForAddOrUpdate(user);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    this.saving = true;
    const modifiedAccount = {...this.data, ...this.accountForm.value} as Account;
    if(this.data.id){
      this.accountService.updateAccount(this.data.id, modifiedAccount);
    }else{
      //Adding Account
      const accountUser = {role: ADMIN, ...this.ownerUser};
      modifiedAccount.ownerUserId = this.ownerUser.uid;
      modifiedAccount.users = [this.ownerUser.uid];
      this.accountService.addAccount(modifiedAccount, accountUser).subscribe();

    }
    this.dialogRef.close(modifiedAccount);
  }

  ngOnInit(): void {
    
  }

}
