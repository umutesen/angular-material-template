import {LocalDatePipe} from './local-date.pipe';

describe('LocalDatePipe', () => {
    const pipe = new LocalDatePipe();
    const date = new Date('2018-05-04T08:17:57.8979116Z');

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('returns valid date given utc', () => {
        const result = pipe.transform(date, 'DD MMM YYYY HH:mm');

        // GMT +1
        expect(result).toBe('04 May 2018 10:17');
    });

    it('returns empty string when date is null', () => {
        const result = pipe.transform(null, 'DD MMM YYYY HH:mm');

        expect(result).toBe('');
    });

    it('returns empty string when format is null', () => {
        const result = pipe.transform(date, null);

        expect(result).toBe('');
    });
});
