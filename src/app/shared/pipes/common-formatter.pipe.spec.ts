import {CommonFormatterPipe} from "./common-formatter.pipe";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {Locale} from "../model/locale";
import {DataType} from "../model/data-type";

describe('CommonFormatterPipe', () => {
    const date = new Date('2018-05-04T08:17:57.8979116Z');
    const price = 3.14;
    const text = "dfsjbqdfABZJKAGZ$^^*ùm*^637643768_e(è_çéur";
    const pipeEn = new CommonFormatterPipe(new Locale('en'));
    const pipeFr = new CommonFormatterPipe(new Locale('fr'));

    beforeAll(() => {
        registerLocaleData(localeFr, 'fr', localeFrExtra);
    })

    it('create an instance', () => {
        expect(pipeEn).toBeTruthy();
    });

    it('returns empty string when date is null', () => {
        const result = pipeEn.transform(null, DataType.DATE);

        expect(result).toBe('');
    });

    it('returns valid date given utc - en', () => {
        const result = pipeEn.transform(date, DataType.DATE);

        expect(result).toBe('May 4, 2018');
    });

    it('returns valid date given utc - fr', () => {
        const result = pipeFr.transform(date, DataType.DATE);

        expect(result).toBe('4 mai 2018');
    });

    it('returns valid time given utc - en', () => {
        const result = pipeEn.transform(date, DataType.TIME);

        expect(result).toBe('10:17:57 AM');
    });

    it('returns valid time given utc - fr', () => {
        const result = pipeFr.transform(date, DataType.TIME);

        expect(result).toBe('10:17:57');
    });

    it('returns valid date time given utc - en', () => {
        const result = pipeEn.transform(date, DataType.DATETIME);

        expect(result).toBe('5/4/18, 10:17 AM');
    });

    it('returns valid date time given utc - fr', () => {
        const result = pipeFr.transform(date, DataType.DATETIME);

        expect(result).toBe('04/05/2018 10:17');
    });

    it('returns valid currency - en', () => {
        const result = pipeEn.transform(price, DataType.CURRENCY_EUR);

        expect(result).toBe('EUR3.14');
    });

    it('returns valid currency - fr', () => {
        const result = pipeFr.transform(price, DataType.CURRENCY_EUR);

        expect(result).toBe('3,14 EUR');
    });

    it('returns valid decimal - en', () => {
        const result = pipeEn.transform(price, DataType.DECIMAL);

        expect(result).toBe('3.14');
    });

    it('returns valid decimal - fr', () => {
        const result = pipeFr.transform(price, DataType.DECIMAL);

        expect(result).toBe('3,14');
    });

    it('returns valid percent - en', () => {
        const result = pipeEn.transform(price, DataType.PERCENT);

        expect(result).toBe('314%');
    });

    it('returns valid percent - fr', () => {
        const result = pipeFr.transform(price, DataType.PERCENT);

        expect(result).toBe('314 %');
    });

    it('returns valid text', () => {
        const result = pipeEn.transform(text, DataType.TEXT);

        expect(result).toBe(text);
    });

    it('returns valid boolean - true', () => {
        const result = pipeEn.transform(true, DataType.BOOLEAN);

        expect(result).toBe("check");
    });

    it('returns valid boolean - false', () => {
        const result = pipeEn.transform(false, DataType.BOOLEAN);

        expect(result).toBe("close");
    });
});
