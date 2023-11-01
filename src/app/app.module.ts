import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NgxsModule } from '@ngxs/store';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //provideFirestore(() => getFirestore()),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    NgxsModule.forRoot([], {
      selectorOptions: {
        injectContainerState: false
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
