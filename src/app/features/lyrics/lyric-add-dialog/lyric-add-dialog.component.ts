import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AccountSong } from "src/app/core/model/account-song";
import { Song } from "src/app/core/model/song";
import { SongService } from "src/app/core/services/song.service";
import { SongEditDialogComponent } from "../../songs/song-edit-dialog/song-edit-dialog.component";
import { AccountLyric, Lyric } from "src/app/core/model/lyric";
import { LyricsService } from "src/app/core/services/lyrics.service";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { BaseUser, UserHelper } from "src/app/core/model/user";

@Component({
  selector: "app-lyric-add-dialog",
  templateUrl: "./lyric-add-dialog.component.html",
  styleUrls: ["./lyric-add-dialog.component.css"],
})
export class LyricAddDialogComponent {
  currentUser: BaseUser;
  saving = false;
  isNew = true;
  get name() {
    return this.lyricForm.get("name");
  }

  constructor(
    public dialogRef: MatDialogRef<LyricAddDialogComponent>,
    private lyricService: LyricsService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: {accountLyric: AccountLyric, countOfLyrics: number}, 
  ) {
    this.authService.user$.subscribe((user) => {
      if (user && user.uid) {
        this.currentUser = UserHelper.getForUpdate(user);
      }
    });
    if (this.data.countOfLyrics === 0) {
      this.isNew = false;
    }
    this.name?.setValue( `Version ${this.data.countOfLyrics + 1}`);
  }

  lyricForm = new FormGroup({
    name: new FormControl(this.data?.accountLyric.name || "", Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.saving = true;
    const modifiedLyric = this.lyricForm.value as Lyric;
    modifiedLyric.createdByUser = this.currentUser;
    if (this.data && this.data.accountLyric.accountId && this.data.accountLyric.songId) {
      this.lyricService
        .addSongLyric(this.data.accountLyric.accountId, this.data.accountLyric.songId,  modifiedLyric, this.currentUser)
        .subscribe((result) => {
          this.dialogRef.close(result);
        });
    }
  }
}
