import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SongService } from 'src/app/core/services/song.service';
import { SAMPLE_SONGS } from 'src/app/core/model/sampleSongs';
import { Observable } from 'rxjs';
import { Song } from 'src/app/core/model/song';
import { ActivatedRoute, Router } from '@angular/router';
import { SongEditDialogComponent } from '../song-edit-dialog/song-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountSong } from 'src/app/core/model/account-song';
import { Select, Store } from '@ngxs/store';
import { AccountActions, AccountState } from 'src/app/core/store/account.state';
import { Account } from 'src/app/core/model/account';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  @Select(AccountState.selectedAccount) 
  selectedAccount$!: Observable<Account>;
  
  displayedColumns: string[] = [ 'name', 'artist', 'genre', 'key'];
  dataSource =  new MatTableDataSource();
  accountId?: string;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private titleService: Title,
    private songService: SongService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog

  ) { 
    const selectedAccount = this.store.selectSnapshot(AccountState.selectedAccount);
    const id = this.route.snapshot.paramMap.get('accountid');
    if(id){
      this.accountId = id;
      this.songService.getSongs(this.accountId).subscribe((songs) => {
        this.dataSource =  new MatTableDataSource(songs);
      });
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Songs');
    
    this.dataSource.sort = this.sort;
  }

  onAddSong(){
    const dialogRef = this.dialog.open(SongEditDialogComponent, {
      data: { accountId: this.accountId} as AccountSong,
      panelClass: "dialog-responsive",
    });
  }

  onEditSong(row: any){
    const dialogRef = this.dialog.open(SongEditDialogComponent, {
      data: { accountId: this.accountId, song: row} as AccountSong,
      panelClass: "dialog-responsive",
    });
  }
}
