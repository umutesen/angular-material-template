import {SpinnerConsumer} from '../../shared/mocks/spinner-consumer';
import {SpinnerService} from './spinner.service';
import {Injector} from "@angular/core";

describe('BusyIndicatorService', () => {
    let component: SpinnerService;
    let consumer1: SpinnerConsumer;
    let consumer2: SpinnerConsumer;

    beforeEach(() => {
        component = new SpinnerService();
        consumer1 = Injector.create({
            providers: [
                {provide: SpinnerConsumer},
                {provide: SpinnerService, useValue: component},
            ],
        }).get(SpinnerConsumer);
        consumer2 = Injector.create({
            providers: [
                {provide: SpinnerConsumer},
                {provide: SpinnerService, useValue: component},
            ],
        }).get(SpinnerConsumer);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should initialise visibility to false', () => {
        component.visibility.subscribe((value: boolean) => {
            expect(value).toBe(false);
        });
    });

    it('should broadcast visibility to all consumers', () => {
        expect(consumer1.isBusy).toBe(false);
        expect(consumer2.isBusy).toBe(false);
    });

    it('should broadcast visibility to all consumers when the value changes', () => {
        component.visibility.next(true);

        expect(consumer1.isBusy).toBe(true);
        expect(consumer2.isBusy).toBe(true);
    });
});
