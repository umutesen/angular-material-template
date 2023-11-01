import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountSong } from 'src/app/core/model/account-song';
import { Song } from 'src/app/core/model/song';
import { SongService } from 'src/app/core/services/song.service';

@Component({
  selector: 'app-song-edit-dialog',
  templateUrl: './song-edit-dialog.component.html',
  styleUrls: ['./song-edit-dialog.component.css']
})
export class SongEditDialogComponent {
  
  saving = false;
  isNew = true;
  get name() { return this.songForm.get('name'); }

  constructor(
    public dialogRef: MatDialogRef<SongEditDialogComponent>,
    private songService: SongService,
    @Inject(MAT_DIALOG_DATA) public data: AccountSong,
  ) {
    console.log(this.data);
    if(Object.keys(this.data).length){
      this.isNew = false;
    }
  }

  songForm = new FormGroup({
    name: new FormControl(this.data.song?.name || '', Validators.required),
    artist: new FormControl(this.data.song?.artist || ''),
    genre: new FormControl(this.data.song?.genre || ''),
    key: new FormControl(this.data.song?.key || ''),
  });

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    this.saving = true;
    const modifiedSong = this.songForm.value as Song;
    if(this.data.song?.id && this.data.accountId){
      this.songService.updateSong(this.data.accountId, this.data.song?.id, modifiedSong);
    }else if(this.data.accountId){
      this.songService.addSong(this.data.accountId, modifiedSong);
    }
    this.dialogRef.close(modifiedSong);
  }

}
