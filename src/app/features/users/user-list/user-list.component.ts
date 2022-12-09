import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpService } from 'src/app/core/http/http.service';
import { tap } from 'rxjs';
export interface test{
   role: string;
   service: any;
   id:number
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource:any;
myData:any
myData$:any[] = [];
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private myDataService:HttpService
  ) { }
  ngOnInit() {
    this.titleService.setTitle('draft-User');
    this.logger.log('Users loaded');
    this.notificationService.openSnackBar('Users loaded');
    this.myDataService.getData('KASE').subscribe((next: any) =>{
      //@ts-ignore

    

     next.forEach((element:any) =>{
       //console.log(element)
       element.services.forEach((el:any)=>{
 
        //@ts-ignore
        let obj: test = {}
        let b: any[]  = [];
        obj.role = el.company
        obj.id = el.id;
        console.log(el.id)
        //@ts-ignore
        //b = [];
        el.services.forEach((element2: any) =>{
                    
                   // console.log(element2.service_name)
                     b.push(element2.service_name); 
                     obj.service = []; 
                    obj.service = b; 
                  })
    
               
           
        // console.log(obj)
         this.myData$.push(obj)      
       })

       

     })



    console.log(this.myData$)
    this.dataSource = new MatTableDataSource(this.myData$)
 }  
 
 
 );
    



}
}
;