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

@Component({
  selector: "app-lyrics",
  templateUrl: "./lyrics.component.html",
  styleUrls: ["./lyrics.component.css"],
})
export class LyricsComponent {
  accountId?: string;
  songId?: string;
  song?: Song;
  selectedLyric?: Lyric;
  lyrics: Lyric[];
  lyricVersions = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private lyricsService: LyricsService,
    private songService: SongService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog
  ) {
    const selectedAccount = this.store.selectSnapshot(
      AccountState.selectedAccount
    );
    const accountId = this.route.snapshot.paramMap.get("accountid");
    const songId = this.route.snapshot.paramMap.get("songid");
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
          this.selectedLyric = lyrics[0];
        });
    }
    
  }

  onAddLyric() {}

  onEditLyric() {
    this.router.navigate([`/accounts/${this.accountId}/songs/${this.songId}/lyrics/${this.selectedLyric?.id}/edit`]);
  }

  onBackToSong() {
    this.router.navigateByUrl('/accounts/' + this.accountId  + '/songs');
  }
}
