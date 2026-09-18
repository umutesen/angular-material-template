import {LimitToPipe} from './limit-to.pipe';

describe('LimitToPipe', () => {
    const pipe = new LimitToPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('returns same value when length is shorter than specified', () => {
        const result = pipe.transform('some text', '20');

        expect(result).toBe('some text');
    });

    it('returns limited value when length is longer than specified', () => {
        const result = pipe.transform('some text', '3');

        expect(result).toBe('som..');
    });

    it('returns empty string when value is empty', () => {
        const result = pipe.transform('', '3');

        expect(result).toBe('');
    });

    it('returns empty string when value is null', () => {
        const result = pipe.transform(null, '3');

        expect(result).toBe('');
    });

    it('returns empty string when value is undefined', () => {
        const result = pipe.transform(undefined, '3');

        expect(result).toBe('');
    });

    it('returns empty string when limit to is 0', () => {
        const result = pipe.transform(undefined, '0');

        expect(result).toBe('');
    });
});
