import {Component, inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-account-page',
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.css'],
    standalone: false
})
export class AccountPageComponent implements OnInit {
    private titleService = inject(Title);

    ngOnInit() {
        this.titleService.setTitle(environment.applicationName + " - " + $localize`:@@account.title:Account`);
    }
}
