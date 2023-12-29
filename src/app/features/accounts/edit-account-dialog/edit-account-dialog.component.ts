import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef as MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Account } from 'src/app/core/model/account';
import { ADMIN } from 'src/app/core/model/roles';
import { BaseUser, User, UserHelper } from 'src/app/core/model/user';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-edit-account-dialog',
    templateUrl: './edit-account-dialog.component.html',
    styleUrls: ['./edit-account-dialog.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatDialogModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule]
})
export class EditAccountDialogComponent implements OnInit {
  saving = false;
  isNew = true;
  currentUser: BaseUser;
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
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Account,
  ) {
    if(Object.keys(data).length){
      this.isNew = false;
    }
    this.authService.user$.subscribe((user) => {
      if(user && user.uid){
        this.currentUser = UserHelper.getForUpdate(user);
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
      this.accountService.updateAccount(this.data.id, this.currentUser, modifiedAccount);
    }else{
      //Adding Account
      const accountUser = {role: ADMIN, ...this.currentUser};
      modifiedAccount.users = [this.currentUser.uid];
      this.accountService.addAccount(modifiedAccount, this.currentUser, accountUser).subscribe();

    }
    this.dialogRef.close(modifiedAccount);
  }

  ngOnInit(): void {
    
  }

}
