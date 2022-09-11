import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-check-all',
  templateUrl: './select-check-all.component.html',
  styleUrls: ['./select-check-all.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckAllComponent {
  @Input()
  model: UntypedFormControl = new UntypedFormControl;
  @Input() values = [];
  @Input() text = 'Select All';

  constructor() { }

  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }

  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
      && this.model.value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }
}
