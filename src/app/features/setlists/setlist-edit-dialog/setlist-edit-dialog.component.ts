import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from "@angular/fire/firestore";
import { AccountSetlist } from 'src/app/core/model/account-setlist';
import { Setlist } from 'src/app/core/model/setlist';
import { BaseUser, UserHelper } from 'src/app/core/model/user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SetlistService } from 'src/app/core/services/setlist.service';
import * as moment from "moment";

@Component({
  selector: 'app-setlist-edit-dialog',
  templateUrl: './setlist-edit-dialog.component.html',
  styleUrls: ['./setlist-edit-dialog.component.css']
})
export class SetlistEditDialogComponent {
  currentUser: BaseUser;
  saving = false;
  isNew = true;
  get name() { return this.setlistForm.get('name'); }

  constructor(
    public dialogRef: MatDialogRef<SetlistEditDialogComponent>,
    private setlistService: SetlistService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: AccountSetlist,
  ) {
    
    this.authService.user$.subscribe((user) => {
      if (user && user.uid) {
        this.currentUser = UserHelper.getForUpdate(user);
      }
    });

    if(this.data && this.data.setlist){
      this.isNew = false;
    }
  }

  //This is a good video for creating forms https://angular-university.io/lesson/angularfire-crud-create-part-1
  setlistForm = new FormGroup({
    name: new FormControl(this.data.setlist?.name || '', Validators.required),
    gigLocation: new FormControl(this.data.setlist?.gigLocation || ''),
    gigDatePicker: new FormControl(this.data.setlist?.gigDate ? this.data.setlist?.gigDate.toDate() : new Date()),
  });

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    this.saving = true;
    
    const modifiedSetlist = this.setlistForm.value as Setlist;
    if(this.setlistForm.value.gigDatePicker){
      const gigDate = this.setlistForm.value.gigDatePicker as unknown as moment.Moment;
      modifiedSetlist.gigDate = Timestamp.fromDate(gigDate.toDate());
    }
    if(this.data.setlist?.id && this.data.accountId){
      this.setlistService.updateSetlist(this.data.accountId, this.data.setlist?.id, modifiedSetlist, this.currentUser);
    }else if(this.data.accountId){
      this.setlistService.addSetlist(this.data.accountId, modifiedSetlist, this.currentUser);
    }
    this.dialogRef.close(modifiedSetlist);
  }

}
