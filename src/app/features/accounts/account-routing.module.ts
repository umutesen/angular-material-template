import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutNoSidebarComponent } from "src/app/shared/layout-no-sidebar/layout-no-sidebar.component";
import { AccountHomeComponent } from "./account-home/account-home.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/compat/auth-guard";
const routes: Routes = [
  {
    path: "",
    component: LayoutNoSidebarComponent,
    children: [
      { path: "", component: AccountHomeComponent },
      {
        path: ":accountid/songs",
        loadChildren: () =>
          import("../songs/songs.module").then((m) => m.SongsModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedTo },
      },
      {
        path: ":accountid/setlists",
        loadChildren: () =>
          import("../setlists/setlist.module").then((m) => m.SetlistModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedTo },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
