import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

 import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import * as moment from 'moment';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;
    public currentTime: string = ''
    public currentDate: string = ''

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.fullName;
        setInterval(() => {
            this.currentTime = moment().format('HH:mm:ss');
          }, 800)
          this.currentDate = moment().format('DD/MM/YYYY');
        
        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            this.authGuard.canActivate();
        });
    }
    getCurrentTime() {
        return this.currentTime;
      }
    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
