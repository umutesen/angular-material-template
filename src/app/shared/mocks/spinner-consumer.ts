import {SpinnerService} from '../../core/services/spinner.service';
import {inject} from "@angular/core";

export class SpinnerConsumer {
    isBusy = false;
    private spinnerService = inject(SpinnerService);

    constructor() {
        this.spinnerService.visibility.subscribe((value: boolean) => {
            this.isBusy = value;
        });
    }
}
