import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
  } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
    selector: 'filter.component',
    templateUrl: 'filter.component.html',
    styleUrls: ['./filter.component.css']
  })
  export class FilterComponent {
reportField: any;
}