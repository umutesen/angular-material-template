import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SetlistSongsListComponent } from './setlist-songs-list/setlist-songs-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SetlistListComponent },
      { path: ':setlistid/songs', component: SetlistSongsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetlistRoutingModule { }
