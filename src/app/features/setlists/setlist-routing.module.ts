import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: ':accountid',
    component: LayoutComponent,
    children: [
      { path: '', component: SetlistListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetlistRoutingModule { }
