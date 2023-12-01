import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { LyricsComponent } from './lyrics-view/lyrics.component';
import { LyricsEditComponent } from './lyrics-edit/lyrics-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LyricsComponent },
    ]
  },
  {
    path: ':lyricid',
    component: LayoutComponent,
    children: [
      { path: '', component: LyricsComponent },
      { path: 'edit', component: LyricsEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LyricsRoutingModule { }
