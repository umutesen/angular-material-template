import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, timer } from 'rxjs';
import { Subscription } from 'rxjs';

 import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { Account } from 'src/app/core/model/account';
import { Store } from '@ngxs/store';
import { AccountState } from 'src/app/core/store/account.state';
import { UserService } from 'src/app/core/services/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink, MatMenuModule, MatBadgeModule, ExtendedModule, MatSidenavModule, MatListModule, RouterLinkActive, MatDividerModule, NgIf, MatProgressBarModule, RouterOutlet, AsyncPipe]
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    displayUserName$: Observable<string |null>;
    isAdmin: boolean = false;
    selectedAccount: Account;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private store: Store,
        private authService: AuthenticationService) {
        this.displayUserName$ = authService.displayName$;
        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.selectedAccount = this.store.selectSnapshot(AccountState.selectedAccount);
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

    onLogout(){
        this.authService.logout();
    }
}
