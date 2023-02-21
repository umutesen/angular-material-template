import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { SelectCheckAllComponent } from './select-check-all/select-check-all.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatSortModule
  ],
  exports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, SelectCheckAllComponent, DragDropModule, MatSortModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    { provide: LOCALE_ID, useValue: 'en-gb' }
  ],
  declarations: [SelectCheckAllComponent]
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
      providers: [
      ]
    };
  }
}
