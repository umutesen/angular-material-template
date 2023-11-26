import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Account } from 'src/app/core/model/account';
import { SetlistSong } from 'src/app/core/model/setlist-song';
import { Song } from 'src/app/core/model/song';
import { SetlistSongsService } from 'src/app/core/services/setlist-songs.service';
import { SetlistService } from 'src/app/core/services/setlist.service';
import { SongService } from 'src/app/core/services/song.service';
import { AccountState } from 'src/app/core/store/account.state';

@Component({
  selector: 'app-setlist-songs-list',
  templateUrl: './setlist-songs-list.component.html',
  styleUrls: ['./setlist-songs-list.component.css']
})
export class SetlistSongsListComponent {
  @Select(AccountState.selectedAccount) 
  selectedAccount$!: Observable<Account>;
  
  displayedSongColumns: string[] = [ 'name', 'artist'];
  displayedColumns: string[] = [ 'sequence', 'name', 'artist'];
  dsSetlistSongs =  new MatTableDataSource();
  dsSongs = new MatTableDataSource();
  accountId?: string;
  setlistId?: string;
  setlistSongCount: number;

  displaySequence = 1;
  //Used for numbering the rows to skip the
  setlistBreakCount = 0;

  //Use to select the row.
  selectedRowSequence = -1;
  
  
  constructor(private logger: NGXLogger,
    private route: ActivatedRoute,
    private titleService: Title,
    private setlistSongsService: SetlistSongsService,
    private songService: SongService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog) {
    const selectedAccount = this.store.selectSnapshot(AccountState.selectedAccount);
    const accountId = this.route.snapshot.paramMap.get('accountid');
    const setlistId = this.route.snapshot.paramMap.get('setlistid');
    if(accountId && setlistId){
      this.accountId = accountId;

      //Get the songs for the song picker
      this.songService.getSongs(this.accountId).subscribe((songs) => {
        this.dsSongs =  new MatTableDataSource(songs);
      });

      //Get the setlist songs
      if(setlistId){
        this.setlistId = setlistId;
        this.setlistSongsService.getSetlistSongs(this.accountId, this.setlistId).subscribe((setlistSongs) => {
          this.dsSetlistSongs =  new MatTableDataSource(setlistSongs);
          this.setlistSongCount = this.dsSetlistSongs.filteredData.length;
        });
      }
    }
   }

  onAddSetlistSong(row: Song): void {
    const sequenceNumber = this.getSequenceNumberForAddOrUpdate();
    const setlistSong = {displaySequenceNumber: sequenceNumber, sequenceNumber: sequenceNumber, songId: row.id!, isBreak: false, ...row};
    this.setlistSongsService.addSetlistSong(this.accountId!, this.setlistId!, setlistSong)
  }

  onAddBreak(){
    const sequenceNumber = this.getSequenceNumberForAddOrUpdate();
    const setlistSong = {sequenceNumber: sequenceNumber, songId: '', isBreak: true, name: 'Break'};
    this.setlistSongsService.addSetlistBreak(this.accountId!, this.setlistId!, setlistSong)
  }

  onEditSetlistSong(row): void{

  }

  getSequenceNumber(rowIndex: number){
    if(rowIndex === 0){
      this.setlistBreakCount = 0;
    }
    
    if(this.setlistBreakCount > 0){
      this.displaySequence = rowIndex - this.setlistBreakCount;
    }
    else{
      this.displaySequence = rowIndex;
    }

    return this.displaySequence + 1;
  }

  incrementSetBreakCount(){
    this.setlistBreakCount += 1;
    return '';
  }

  selectRow(row){
    if(this.selectedRowSequence === -1 || this.selectedRowSequence !== row.sequenceNumber){
      this.selectedRowSequence = row.sequenceNumber;
    }
    else{
      this.selectedRowSequence = -1;
    }
  }

  private getSequenceNumberForAddOrUpdate() {
    let sequenceNumber = this.setlistSongCount + 1;
    if (this.selectedRowSequence !== -1) {
      sequenceNumber = this.selectedRowSequence + 0.01;
    }
    return sequenceNumber;
  }
}
