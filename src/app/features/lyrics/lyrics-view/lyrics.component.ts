import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
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
  setlistId?: string;
  song?: Song;
  selectedLyric?: Lyric;
  lyricVersionValue = "add";
  lyrics: Lyric[];
  lyricVersions = new FormControl("");
  currentUser: any;

  constructor(
    private activeRoute: ActivatedRoute,
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

    //The version can change on the page. This will subscribe to the page change event
    //Normally navigating to the same component is not supported. 
    //I added the onSameUrlNavigation: 'reload' on the router config.
    activeRoute.params.subscribe(val => {
      this.initLyrics();
    });
  }

  private initLyrics() {
    const accountId = this.activeRoute.snapshot.paramMap.get("accountid");
    const songId = this.activeRoute.snapshot.paramMap.get("songid");
    this.lyricId = this.activeRoute.snapshot.paramMap.get("lyricid") || undefined;
    this.setlistId = this.activeRoute.snapshot.paramMap.get("setlistid") || undefined;
    if (accountId && songId) {
      this.accountId = accountId;
      this.songId = songId;
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
          } else {
            this.selectedLyric = lyrics.find(
              (lyric) => lyric.id === this.lyricId
            );
          }

          this.lyricVersionValue = this.selectedLyric?.id || "add";
        });
    }
  }

  onAddLyric(event?) {
    event?.preventDefault();
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
      if (result) {
        this.selectedLyric = result;
        this.onEditLyric();
      }{
        this.lyricVersionValue = this.selectedLyric?.id || "add";
      }
    });
  }

  onEditLyric() {
    if(this.lyricId){
        this.router.navigate([`../${this.selectedLyric?.id}/edit`], {
          relativeTo: this.activeRoute,
        });
      }
      else{
        this.router.navigate([`${this.selectedLyric?.id}/edit`], {
          relativeTo: this.activeRoute,
        });
      }
    
  }

  onSelectLyric(value: string) {
    if (value === "add") {
      this.onAddLyric();
    } else {
      //Switch to another lyrics. If there is no lyric id the route is different. 
      //You may get here without a lyric id when selecting from the song list.
      if(this.lyricId){
        this.router.navigate([`../${value}`], {
          relativeTo: this.activeRoute,
        });
      }
      else{
        //Switch to another lyrics
        this.router.navigate([`../lyrics/${value}`], {
          relativeTo: this.activeRoute,
        });
      }
    }
  }

  onBackToSong() {
    if(this.lyricId){
    this.router.navigate(["../../.."], { relativeTo: this.activeRoute });
    }
    else{
      this.router.navigate(["../.."], { relativeTo: this.activeRoute });
    }
  }
}
