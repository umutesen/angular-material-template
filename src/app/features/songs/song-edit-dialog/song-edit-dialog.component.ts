import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, tap, throwError } from 'rxjs';
import { AccountSong } from 'src/app/core/model/account-song';
import { Song } from 'src/app/core/model/song';
import { BaseUser, UserHelper } from 'src/app/core/model/user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SongService } from 'src/app/core/services/song.service';

@Component({
  selector: 'app-song-edit-dialog',
  templateUrl: './song-edit-dialog.component.html',
  styleUrls: ['./song-edit-dialog.component.css']
})
export class SongEditDialogComponent {
  currentUser: BaseUser;
  saving = false;
  isNew = true;
  get name() { return this.songForm.get('name'); }

  constructor(
    public dialogRef: MatDialogRef<SongEditDialogComponent>,
    private songService: SongService,
    private authService: AuthenticationService,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: AccountSong,
  ) {
    
    if(Object.keys(this.data).length){
      this.isNew = false;
    }

    this.authService.user$.subscribe((user) => {
      if (user && user.uid) {
        this.currentUser = UserHelper.getForUpdate(user);
      }
    });
  }

  songForm = new FormGroup({
    name: new FormControl(this.data.song?.name || '', Validators.required),
    artist: new FormControl(this.data.song?.artist || ''),
    genre: new FormControl(this.data.song?.genre || ''),
    key: new FormControl(this.data.song?.key || 'C'),
    tempo: new FormControl(this.data.song?.tempo || 120, [Validators.min(0), Validators.max(400)] ),
    lengthMin: new FormControl(this.data.song?.lengthMin || 3, [Validators.min(0), Validators.max(59)] ),
    lengthSec: new FormControl(this.data.song?.lengthSec || 0, [Validators.min(0), Validators.max(59)] ),
    beatValue: new FormControl(this.data.song?.beatValue || 4, [Validators.min(1), Validators.max(12)] ),
    noteValue: new FormControl(this.data.song?.noteValue || 4, [Validators.min(1), Validators.max(12)] ),
  });

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    this.saving = true;
    const modifiedSong = {...this.data.song, ...this.songForm.value} as Song;
    if(this.data.song?.id && this.data.accountId){
      this.songService.updateSong(this.data.accountId, this.data.song?.id, modifiedSong, this.currentUser)
      .pipe(
        tap((result) => this.dialogRef.close(modifiedSong)),
        catchError((err) => {
          console.log(err);
          alert('Could not update song');
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
    }else if(this.data.accountId){
      const newSongId = this.afs.createId();
      this.songService.addSong(this.data.accountId, newSongId, modifiedSong, this.currentUser)
      .pipe(
        tap((result) => this.dialogRef.close(modifiedSong)),
        catchError((err) => {
          console.log(err);
          alert('Could not add song.');
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
    }
    
  }

}
