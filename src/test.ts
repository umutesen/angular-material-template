// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js';
import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserTestingModule, platformBrowserTesting} from "@angular/platform-browser/testing";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr', localeFrExtra);

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(),
);
