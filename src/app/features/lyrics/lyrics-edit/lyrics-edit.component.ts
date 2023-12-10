import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { Lyric } from 'src/app/core/model/lyric';
import { Song } from 'src/app/core/model/song';
import { BaseUser, UserHelper } from 'src/app/core/model/user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LyricsService } from 'src/app/core/services/lyrics.service';
import { SongService } from 'src/app/core/services/song.service';
import { AccountState } from 'src/app/core/store/account.state';

@Component({
  selector: 'app-lyrics-edit',
  templateUrl: './lyrics-edit.component.html',
  styleUrls: ['./lyrics-edit.component.css']
})
export class LyricsEditComponent implements OnInit {
  @ViewChild('lyrics') lyricsInput: ElementRef;
  currentUser: BaseUser;
  accountId?: string;
  songId?: string;
  lyricId?: string;
  song: Song;
  selectedLyric: Lyric;
  lyricsForm: FormGroup;
  
  
  get lyrics() { return this.lyricsForm.get('lyrics'); }
  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private lyricsService: LyricsService,
    private songService: SongService,
    private store: Store,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog) { 
      const selectedAccount = this.store.selectSnapshot(
        AccountState.selectedAccount
      );

      this.authService.user$.subscribe((user) => {
        if(user && user.uid){
          this.currentUser = UserHelper.getForUpdate(user);
        }
      });

      this.lyricsForm = new FormGroup({
        lyrics: new FormControl(this.selectedLyric?.name),
      });

      const accountId = this.route.snapshot.paramMap.get("accountid");
      const songId = this.route.snapshot.paramMap.get("songid");
      const lyricId = this.route.snapshot.paramMap.get("lyricid");
      if (accountId && songId && lyricId) {
        this.accountId = accountId;
        this.songId = songId;
        this.lyricId = lyricId;
        this.songService
          .getSong(this.accountId, this.songId)
          .pipe(take(1))
          .subscribe((song) => {
            this.song = song;
          });
  
        this.lyricsService
          .getSongLyric(this.accountId, this.songId, this.lyricId)
          .pipe(take(1))
          .subscribe((lyric) => {
            this.selectedLyric = lyric;
            const lyricsTextArea = this.lyricsForm.get("lyrics");
            lyricsTextArea?.setValue(this.selectedLyric.lyrics);
          });
    }
  }

  ngOnInit(): void {

  }

  onSaveSong(){
    this.selectedLyric.lyrics = this.lyrics?.value;
    this.lyricsService.updateLyric(this.accountId!, this.songId!, this.selectedLyric, this.currentUser).subscribe((result) => {
      this.router.navigate([`/accounts/${this.accountId}/songs/${this.songId}/lyrics/${this.selectedLyric?.id}`])
    });
  }

  onCancel(){
    //TODO: ADD ARE YOU SURE.
    this.router.navigate([`/accounts/${this.accountId}/songs/${this.songId}/lyrics/${this.selectedLyric?.id}`])
  }

}
