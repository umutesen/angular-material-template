import {enableProdMode, provideZoneChangeDetection} from '@angular/core';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {platformBrowser} from "@angular/platform-browser";

if (environment.production) {
    enableProdMode();
}

platformBrowser().bootstrapModule(AppModule, {applicationProviders: [provideZoneChangeDetection()],})
    .catch(err => console.error(err));
