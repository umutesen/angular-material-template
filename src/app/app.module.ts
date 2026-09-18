import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import {AppRoutingModule} from './app-routing.module';
import {LoggerModule} from 'ngx-logger';
import {environment} from '../environments/environment';
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {MatPaginatorLocalized} from "./shared/paged/service/paginator-intl";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Locale} from "./shared/model/locale";

registerLocaleData(localeFr, 'fr', localeFrExtra);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        CustomMaterialModule.forRoot(),
        AppRoutingModule,
        LoggerModule.forRoot({
            serverLoggingUrl: `http://my-api/logs`,
            level: environment.logLevel,
            serverLogLevel: environment.serverLogLevel
        })
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: MatPaginatorLocalized
        },
        {
            provide: Locale,
            useValue: new Locale($localize.locale)
        }
    ]
})
export class AppModule {

}
