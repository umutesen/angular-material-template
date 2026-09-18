import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {LimitToPipe} from './pipes/limit-to.pipe';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {
    ContentPlaceholderAnimationComponent
} from './content-placeholder-animation/content-placeholder-animation.component';
import {LocalDatePipe} from './pipes/local-date.pipe';
import {YesNoPipe} from './pipes/yes-no.pipe';
import {LayoutComponent} from './layout/layout.component';
import {MatLine} from "@angular/material/core";
import {CommonFormatterPipe} from "./pipes/common-formatter.pipe";
import {PagedComponent} from "./paged/page/paged.component";

@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatLine,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        CommonFormatterPipe,
        LayoutComponent,
        PagedComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe,
        CommonFormatterPipe,
        PagedComponent
    ]
})
export class SharedModule {
    
}
