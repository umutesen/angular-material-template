import {Component, inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';
import {NotificationService} from "../../../core/services/notification.service";
import {AuthenticationService} from "../../../core/services/auth.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css'],
    standalone: false
})
export class DashboardHomeComponent implements OnInit {
    currentUser: any;
    private notificationService = inject(NotificationService);
    private authService = inject(AuthenticationService);
    private titleService = inject(Title);
    private logger = inject(NGXLogger);

    ngOnInit() {
        this.titleService.setTitle(environment.applicationName + " - " + $localize`:@@dashboard.title:Dashboard`);
        this.currentUser = this.authService.getCurrentUser();
        this.logger.log('Dashboard loaded');

        setTimeout(() => {
            this.notificationService.openSnackBar('Welcome!');
        });
    }
}
