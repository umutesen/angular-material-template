import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountSetlist } from 'src/app/core/model/account-setlist';
import { Setlist } from 'src/app/core/model/setlist';
import { SetlistService } from 'src/app/core/services/setlist.service';

@Component({
  selector: 'app-setlist-edit-dialog',
  templateUrl: './setlist-edit-dialog.component.html',
  styleUrls: ['./setlist-edit-dialog.component.css']
})
export class SetlistEditDialogComponent {

  saving = false;
  isNew = true;
  get name() { return this.setlistForm.get('name'); }

  constructor(
    public dialogRef: MatDialogRef<SetlistEditDialogComponent>,
    private setlistService: SetlistService,
    @Inject(MAT_DIALOG_DATA) public data: AccountSetlist,
  ) {
    
    if(Object.keys(this.data).length){
      this.isNew = false;
    }
  }

  setlistForm = new FormGroup({
    name: new FormControl(this.data.setlist?.name || '', Validators.required),
    gigLocation: new FormControl(this.data.setlist?.gigLocation || ''),

  });

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    this.saving = true;
    const modifiedSong = this.setlistForm.value as Setlist;
    if(this.data.setlist?.id && this.data.accountId){
      this.setlistService.updateSetlist(this.data.accountId, this.data.setlist?.id, modifiedSong);
    }else if(this.data.accountId){
      this.setlistService.addSetlist(this.data.accountId, modifiedSong);
    }
    this.dialogRef.close(modifiedSong);
  }

}
