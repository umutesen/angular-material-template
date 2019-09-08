import { SpinnerConsumer } from '../../shared/mocks/spinner-consumer';
import { SpinnerService } from './spinner.service';

describe('BusyIndicatorService', () => {
    let component: SpinnerService;
    let consumer1: SpinnerConsumer;
    let consumer2: SpinnerConsumer;

    beforeEach(() => {
        component = new SpinnerService();
        consumer1 = new SpinnerConsumer(component);
        consumer2 = new SpinnerConsumer(component);
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
