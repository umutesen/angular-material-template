import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "src/app/shared/layout/layout.component";
import { SetlistListComponent } from "./setlist-list/setlist-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SetlistSongsListComponent } from "./setlist-songs-list/setlist-songs-list.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/compat/auth-guard";
import { LyricsComponent } from "../lyrics/lyrics-view/lyrics.component";
import { LyricsEditComponent } from "../lyrics/lyrics-edit/lyrics-edit.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", component: SetlistListComponent },
      { path: ":setlistid/songs", component: SetlistSongsListComponent },
    ],
  },
  {
    path: ":setlistid/songs/:songid/lyrics",
    loadChildren: () =>
      import("../lyrics/lyrics.module").then((m) => m.LyricsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedTo },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetlistRoutingModule {}
