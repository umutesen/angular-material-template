import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpService } from 'src/app/core/http/http.service';




export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
   
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [

    
  ];
export interface roles{
roles:any
}
export interface test{
   id: number;
   role: any;
   service: any;


}
let i:number

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.css']
})
export class BrokerListComponent implements OnInit {
   displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource: any;

 
myData:any
myData$:any[] = [];
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private myDataService:HttpService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    this.notificationService.openSnackBar('Customers loaded');
  
     this.myDataService.getData('BROKER').subscribe((next: any) =>{
        //@ts-ignore
 
        const ob: roles = {
          roles: undefined
        };
      //      for(let i=0; i<5;i++){
      //   next.forEach((element: any)=> {
      //       console.log(element)
      //     //  obj.role = next.roles[0]
         
      //       obj.role = element.services[i].company;
              
            
              
      //        const c: any[]=[]
      //        element.services[0].services.forEach((element2: any) =>{
      //         console.log('---')
      //           console.log(element2.service_name )
      //           b.push(element2.service_name);    
      //        })

      //        obj.service = b   
            
              
          
      //      });
            
            
   
    
      
      
      // const a=  this.myData$.push(obj)
      //   console.log(obj)}





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