import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxsModule } from '@ngxs/store';
import { LoggerModule } from 'ngx-logger';
import { AccountStateModule } from './app/core/store/account-state.module';
import { AppRoutingModule } from './app/app-routing.module';
import { CustomMaterialModule } from './app/custom-material/custom-material.module';
import { SharedModule } from './app/shared/shared.module';
import { CoreModule } from './app/core/core.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
        //provideFirestore(() => getFirestore()),
        //provideFirebaseApp(() => initializeApp(environment.firebase)),
        BrowserModule, CoreModule, SharedModule, CustomMaterialModule.forRoot(), AppRoutingModule, AccountStateModule, LoggerModule.forRoot({
            serverLoggingUrl: `http://my-api/logs`,
            level: environment.logLevel,
            serverLogLevel: environment.serverLogLevel
        }), NgxsModule.forRoot([], {
            selectorOptions: {
                injectContainerState: false
            }
        }), AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, // for firestore
        MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
