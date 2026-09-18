import {YesNoPipe} from './yes-no.pipe';

describe('YesNoPipe', () => {
    const pipe = new YesNoPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('returns Yes given true', () => {
        const result = pipe.transform(true);

        expect(result).toBe('Yes');
    });

    it('returns No given false', () => {
        const result = pipe.transform(false);

        expect(result).toBe('No');
    });
});
