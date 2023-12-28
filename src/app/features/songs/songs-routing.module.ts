import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { SongListComponent } from './song-list/song-list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { SongImportComponent } from './song-import/song-import.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SongListComponent, canActivate: [AngularFireAuthGuard], },
    ]
  },
  {
    path: 'addmultiple',
    component: LayoutComponent,
    children: [
      { path: '', component: SongImportComponent, canActivate: [AngularFireAuthGuard], },
    ]
  },
  {
    path: ":songid/lyrics",
    loadChildren: () =>
      import("../lyrics/lyrics.module").then((m) => m.LyricsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedTo },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
