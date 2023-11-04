import { Component, OnInit, ViewChild } from '@angular/core';
import { SetlistEditDialogComponent } from '../setlist-edit-dialog/setlist-edit-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AccountState } from 'src/app/core/store/account.state';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { Account } from 'src/app/core/model/account';
import { SetlistService } from 'src/app/core/services/setlist.service';
import { AccountSetlist } from 'src/app/core/model/account-setlist';

@Component({
  selector: 'app-setlist-list',
  templateUrl: './setlist-list.component.html',
  styleUrls: ['./setlist-list.component.css']
})
export class SetlistListComponent implements OnInit {
  @Select(AccountState.selectedAccount) 
  selectedAccount$!: Observable<Account>;

  
  displayedColumns: string[] = [ 'name', 'gigLocation'];
  dataSource =  new MatTableDataSource();
  accountId?: string;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private titleService: Title,
    private setlistService: SetlistService,
    private store: Store,
    private router: Router,
    public dialog: MatDialog

  ) { 
    const selectedAccount = this.store.selectSnapshot(AccountState.selectedAccount);
    const id = this.route.snapshot.paramMap.get('accountid');
    if(id){
      this.accountId = id;
      this.setlistService.getSetlists(this.accountId).subscribe((setlists) => {
        this.dataSource =  new MatTableDataSource(setlists);
      });
    }
  }

  ngOnInit() {
    this.titleService.setTitle('Songs');
    
    this.dataSource.sort = this.sort;
  }

  onAddSetlist(){
    const dialogRef = this.dialog.open(SetlistEditDialogComponent, {
      data: { accountId: this.accountId} as AccountSetlist,
      panelClass: "dialog-responsive",
    });
  }

  onEditSetlist(row: any){
    const dialogRef = this.dialog.open(SetlistEditDialogComponent, {
      data: { accountId: this.accountId, setlist: row} as AccountSetlist,
      panelClass: "dialog-responsive",
    });
  }

}
