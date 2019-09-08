import { AbstractControl } from '@angular/forms';

export function AutocompleteSelectionValidator(control: AbstractControl) {
    const selection = control.value;

    if (selection && typeof selection === 'string') {
        return { incorrect: true };
    }

    return null;
}
