import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SongService } from 'src/app/core/services/song.service';
import { SAMPLE_SONGS } from 'src/app/core/model/sampleSongs';
import { Observable, finalize } from 'rxjs';
import { Song } from 'src/app/core/model/song';
import { ActivatedRoute, Router } from '@angular/router';
import { SongEditDialogComponent } from '../song-edit-dialog/song-edit-dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AccountSong } from 'src/app/core/model/account-song';
import { Select, Store } from '@ngxs/store';
import { AccountActions, AccountState } from 'src/app/core/store/account.state';
import { Account } from 'src/app/core/model/account';
import { LyricAddDialogComponent } from '../../lyrics/lyric-add-dialog/lyric-add-dialog.component';
import { AccountLyric, Lyric } from 'src/app/core/model/lyric';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  @Select(AccountState.selectedAccount) 
  selectedAccount$!: Observable<Account>;
  currentUser: any;
  displayedColumns: string[] = [ 'name', 'artist', 'genre', 'key', 'tempo', 'timeSignature', 'songLength', 'lyrics'];
  dataSource : Song[];
  accountId: string;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  loading = false;
  lastPageLoaded = 0;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private titleService: Title,
    private songService: SongService,
    private store: Store,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog

  ) { 
    this.authService.user$.subscribe((user) => {
      if(user && user.uid){
        this.currentUser = user;
      }
    });
    const selectedAccount = this.store.selectSnapshot(AccountState.selectedAccount);
    const id = this.route.snapshot.paramMap.get('accountid');
    if(id){
      this.loading = true;
      this.accountId = id;
      this.songService.getSongs(this.accountId)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe((songs) => {
          this.dataSource =  songs;
        });
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Songs');
    
    //this.dataSource.sort = this.sort;
  }

  loadMore(){
    this.lastPageLoaded++;
    this.loading = true;
    this.songService.getSongs(this.accountId, "asc", this.lastPageLoaded)
        .pipe(
          finalize(() => this.loading = false)
        )
        .subscribe((songs) => {
          this.dataSource =  this.dataSource.concat(songs);
        });
  }

  onAddSong(){
    const dialogRef = this.dialog.open(SongEditDialogComponent, {
      data: { accountId: this.accountId} as AccountSong,
      panelClass: "dialog-responsive",
    });
  }

  onAddMultipleSongs(){
    this.router.navigate([`addmultiple`], { relativeTo: this.route });
  }

  onEditSong(row: any){
    const dialogRef = this.dialog.open(SongEditDialogComponent, {
      data: { accountId: this.accountId, song: row} as AccountSong,
      panelClass: "dialog-responsive",
    });
  }

  onViewLyrics(event, row: any){
    event.preventDefault();
    this.router.navigate([row.id + `/lyrics`], { relativeTo: this.route });
  }

  onAddLyric(event, row: Song){
    event.preventDefault();
    const accountLyric = { accountId: this.accountId, songId: row.id, createdByUserId: this.currentUser.uid };
    const dialogRef = this.dialog.open(LyricAddDialogComponent, {
      data: {accountLyric: accountLyric, countOfLyrics: 0},
      panelClass: "dialog-responsive",
    });

    dialogRef.afterClosed().subscribe((result: Lyric) => {
      if(result){
        this.router.navigate([row.id + `/lyrics/${result.id}/edit`], { relativeTo: this.route });
      }
    });
  }
}
