import { Component, OnInit, ViewChild } from "@angular/core";
import { SetlistEditDialogComponent } from "../setlist-edit-dialog/setlist-edit-dialog.component";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { AccountActions, AccountState } from "src/app/core/store/account.state";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatSort } from "@angular/material/sort";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { NGXLogger } from "ngx-logger";
import { Observable } from "rxjs";
import { Account } from "src/app/core/model/account";
import { SetlistService } from "src/app/core/services/setlist.service";
import { AccountSetlist } from "src/app/core/model/account-setlist";
import { Setlist } from "src/app/core/model/setlist";
import { SetlistSongsService } from "src/app/core/services/setlist-songs.service";
import { SetlistSong } from "src/app/core/model/setlist-song";

@Component({
  selector: "app-setlist-list",
  templateUrl: "./setlist-list.component.html",
  styleUrls: ["./setlist-list.component.css"],
})
export class SetlistListComponent implements OnInit {
  @Select(AccountState.selectedAccount)
  selectedAccount$!: Observable<Account>;

  displayedColumns: string[] = ["name", "gigLocation", "gigDate"];
  dataSource = new MatTableDataSource();
  accountId?: string;
  selectedSetlist?: Setlist;
  setlistSongs: SetlistSong[];

  //Used to display the sequence for the setlist songs.
  displaySequence = 1;
  //Used for numbering the rows to skip the
  setlistBreakCount = 0;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private titleService: Title,
    private setlistService: SetlistService,
    private setlistSongsService: SetlistSongsService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog
  ) {
    const selectedAccount = this.store.selectSnapshot(
      AccountState.selectedAccount
    );
    const id = this.route.snapshot.paramMap.get("accountid");
    if (id) {
      this.accountId = id;
      this.setlistService.getSetlists(this.accountId).subscribe((setlists) => {
        this.dataSource = new MatTableDataSource(setlists);
        if (setlists && setlists.length && this.selectedSetlist === undefined) {
          this.selectRow(setlists[0]);
        }
      });
    }
  }

  ngOnInit() {
    this.titleService.setTitle("Setlists");

    this.dataSource.sort = this.sort;
  }

  onAddSetlist() {
    const dialogRef = this.dialog.open(SetlistEditDialogComponent, {
      data: { accountId: this.accountId } as AccountSetlist,
      panelClass: "dialog-responsive",
    });
  }

  onEditSetlist(row: any) {
    const dialogRef = this.dialog.open(SetlistEditDialogComponent, {
      data: { accountId: this.accountId, setlist: row } as AccountSetlist,
      panelClass: "dialog-responsive",
    });
  }

  onViewSetlistSongs(row: any) {
    this.router.navigate([row.id + '/songs'], { relativeTo: this.route } );
  }

  onPrintSetlist(){
    console.log('Not implmented');
  }

  selectRow(row) {
    this.setlistSongs = [];
    this.displaySequence = 1;
      this.setlistBreakCount = 0;

    if (this.selectedSetlist === undefined || this.selectedSetlist?.id !== row.id) {
      this.selectedSetlist = row;
      this.setlistSongsService
        .getSetlistSongs(this.accountId!, this.selectedSetlist!.id!)
        .subscribe((setlistSongs) => {
          this.setlistSongs = setlistSongs.map((song, index) => {
            let breakCount = setlistSongs.slice(0, index).filter(song => song.isBreak === true).length;;
            const sequenceNumber = (index + 1) - breakCount;
            if(!song.isBreak){
              return {...song, sequenceNumber : sequenceNumber};
            }
            
            return {...song, sequenceNumber : sequenceNumber + .01};
          
          });
          
        });
    } 
  }

  getSequenceNumber(rowIndex: number, isBreak){
    if(isBreak){
      this.setlistBreakCount++;
    }
    
    const breakCount = this.setlistSongs.splice(0, rowIndex).filter(song => song.isBreak === true);
    if(breakCount){
      return rowIndex - breakCount.length;
    }
    
    return rowIndex + 1;
  }


}
