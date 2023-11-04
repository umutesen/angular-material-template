import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { SetlistRoutingModule } from './setlist-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetlistEditDialogComponent } from './setlist-edit-dialog/setlist-edit-dialog.component';



@NgModule({
  imports: [
      CommonModule,
      SetlistRoutingModule,
      SharedModule
  ],
  declarations: [
      SetlistListComponent,
      SetlistEditDialogComponent
  ]
})
export class SetlistModule { }
