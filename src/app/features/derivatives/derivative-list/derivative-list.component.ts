import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpService } from 'src/app/core/http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-derivative-list',
  templateUrl: './derivative-list.component.html',
  styleUrls: ['./derivative-list.component.scss']
})
export class DerivativeListComponent implements OnInit {
  displayedColumns: string[] = ['code','date','debit','credit','currency','type-op','type-ac'];
  currencyList: string[] = ['AUD', 'CAD', 'CHF','CNY','DEM','EUR','GBP','JPY','KZT','MYR','RUB','USD'];
  dataSource: any;
  filterValues={
    currency:[],
    type:''

  }
  @ViewChild(MatSort, { static:  true }) sort!: MatSort;
myData:any
myData$:any[] = [];
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private myDataService:HttpService,
    private httpClient:HttpClient
  ) { }
  filter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  } 
  ngOnInit() {
    this.titleService.setTitle('draft - Issuers');
    this.logger.log('Issuers loaded');
    this.notificationService.openSnackBar('Issuers loaded');
    this.httpClient.get('http://192.168.4.18:8084/currency?vDateStart=20221030&vDateEnd=20221102').subscribe((next: any) =>{
      //@ts-ignore

    

     next.forEach((element:any) =>{
       console.log(element)
       this.myData$.push(element)      

     })
    console.log(this.myData$)
    this.dataSource = new MatTableDataSource(this.myData$)
    this.dataSource.sort = this.sort;
    
 }  
 
 );

}
}
;