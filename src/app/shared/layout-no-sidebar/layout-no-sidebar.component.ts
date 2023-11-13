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
@Component({
  selector: "app-layout-no-sidebar",
  templateUrl: "./layout-no-sidebar.component.html",
  styleUrls: ["./layout-no-sidebar.component.css"],
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
