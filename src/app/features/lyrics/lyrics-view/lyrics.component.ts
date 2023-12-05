import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { AccountLyric, Lyric } from "src/app/core/model/lyric";
import { LyricsService } from "src/app/core/services/lyrics.service";
import { SongService } from "src/app/core/services/song.service";
import { AccountState } from "src/app/core/store/account.state";
import { LyricAddDialogComponent } from "../lyric-add-dialog/lyric-add-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Song } from "src/app/core/model/song";
import { take } from "rxjs";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-lyrics",
  templateUrl: "./lyrics.component.html",
  styleUrls: ["./lyrics.component.css"],
})
export class LyricsComponent {
  accountId?: string;
  songId?: string;
  lyricId?: string;
  song?: Song;
  selectedLyric?: Lyric;
  lyricVersionValue = 'add';
  lyrics: Lyric[];
  lyricVersions = new FormControl("");
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private lyricsService: LyricsService,
    private songService: SongService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    const selectedAccount = this.store.selectSnapshot(
      AccountState.selectedAccount
    );

    this.authService.user$.subscribe((user) => {
      if (user && user.uid) {
        this.currentUser = user;
      }
    });

    route.params.subscribe(val => {
      this.initLyrics();
    });
    
  }

  private initLyrics() {
    const accountId = this.route.snapshot.paramMap.get("accountid");
    const songId = this.route.snapshot.paramMap.get("songid");
    const lyricId = this.route.snapshot.paramMap.get("lyricid");
    if (accountId && songId) {
      this.accountId = accountId;
      this.songId = songId;
      this.lyricId = lyricId || undefined;
      this.songService
        .getSong(this.accountId, this.songId)
        .pipe(take(1))
        .subscribe((song) => {
          this.song = song;
        });

      this.lyricsService
        .getSongLyrics(this.accountId, this.songId)
        .pipe(take(1))
        .subscribe((lyrics) => {
          this.lyrics = lyrics;
          if (!this.lyricId) {
            this.selectedLyric = lyrics[0];
          }
          else {
            this.selectedLyric = lyrics.find((lyric) => lyric.id === this.lyricId);
          }

          this.lyricVersionValue = this.selectedLyric?.id || 'add';
        });
    }
  }

  onAddLyric() {}

  onEditLyric() {
    this.router.navigate([
      `/accounts/${this.accountId}/songs/${this.songId}/lyrics/${this.selectedLyric?.id}/edit`,
    ]);
  }

  onSelectLyric(value: string) {
    if (value === "add") {
      const accountLyric = {
        accountId: this.accountId,
        songId: this.songId,
        createdByUserId: this.currentUser.uid,
      };
      const dialogRef = this.dialog.open(LyricAddDialogComponent, {
        data: { accountLyric: accountLyric, countOfLyrics: this.lyrics.length },
        panelClass: "dialog-responsive",
      });

      dialogRef.afterClosed().subscribe((result: Lyric) => {
        this.router.navigate([`/${result.id}/edit`], {
          relativeTo: this.route,
        });
      });
    }
    else{
      this.router.navigate([`/accounts/${this.accountId}/songs/${this.songId}/lyrics/${value}`]);
    }
  }
  onBackToSong() {
    this.router.navigateByUrl("/accounts/" + this.accountId + "/songs");
  }
}
