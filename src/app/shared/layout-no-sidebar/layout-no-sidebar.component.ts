import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { Observable, timer } from "rxjs";
import { Subscription } from "rxjs";

import { AuthenticationService } from "src/app/core/services/auth.service";
import { SpinnerService } from "../../core/services/spinner.service";
import { UserService } from "src/app/core/services/user.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NgIf, AsyncPipe } from "@angular/common";
import { ExtendedModule } from "@angular/flex-layout/extended";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
@Component({
    selector: "app-layout-no-sidebar",
    templateUrl: "./layout-no-sidebar.component.html",
    styleUrls: ["./layout-no-sidebar.component.css"],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatTooltipModule,
        RouterLink,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatBadgeModule,
        ExtendedModule,
        NgIf,
        MatProgressBarModule,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class LayoutNoSidebarComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "";
  isAdmin: boolean = false;
  displayUserName$: Observable<string | null>;
  isLoggedOut$: Observable<boolean>;
  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: AuthenticationService,
    
  ) {
    this.displayUserName$ = authService.displayName$;
    this.mobileQuery = this.media.matchMedia("(max-width: 1000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  onLogout() {
    this.authService.logout();
  }
}
