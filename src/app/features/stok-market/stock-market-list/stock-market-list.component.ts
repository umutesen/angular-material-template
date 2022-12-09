import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpService } from 'src/app/core/http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
@Component({
  selector: 'app-stock-market-list',
  templateUrl: './stock-market-list.component.html',
  styleUrls: ['./stock-market-list.component.css']
})
export class StockMarketListComponent implements OnInit {
  displayedColumns: string[] = ['code','date','debit','credit','currency','type-op','type-ac'];
  dataSource: any;
  
myData:any
myData$:any[] = [];
 
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private myDataService:HttpService,
    private httpClient:HttpClient,
    public dialog: MatDialog
  ) { }
  openDialog() {
    this.dialog.open(FilterComponent);
  }
  ngOnInit() {
    this.titleService.setTitle('draft - Issuers');
    this.logger.log('Issuers loaded');
    this.notificationService.openSnackBar('Issuers loaded');
    this.httpClient.get('http://192.168.4.18:8084/stock?vDateStart=20221030&vDateEnd=20221102').subscribe((next: any) =>{
      //@ts-ignore

    

     next.forEach((element:any) =>{
       console.log(element)
     

       this.myData$.push(element)      

     })



    console.log(this.myData$)
    this.dataSource = new MatTableDataSource(this.myData$)
 }  
 
 
 );
    


}
}
;
