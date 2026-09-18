import {AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Subscription, timer} from 'rxjs';
import {SpinnerService} from '../../core/services/spinner.service';
import {AuthenticationService} from "../../core/services/auth.service";
import {AuthGuard} from "../../core/guards/auth.guard";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: false,
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
    userName: string = "";
    isAdmin: boolean = false;
    public spinnerService = inject(SpinnerService);
    protected readonly environment = environment;
    private media = inject(MediaMatcher);
    mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 1000px)');
    private readonly MOBILE_EVENT: string = "mobile";
    private autoLogoutSubscription: Subscription = new Subscription;
    private changeDetectorRef = inject(ChangeDetectorRef);
    private authService = inject(AuthenticationService);
    private authGuard = inject(AuthGuard);

    ngOnInit(): void {
        this.mobileQuery.addEventListener(this.MOBILE_EVENT, this._mobileQueryListener);
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.fullName;

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            this.authGuard.canActivate();
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener(this.MOBILE_EVENT, this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    private _mobileQueryListener: (() => void) = () => this.changeDetectorRef.detectChanges();
}
