import { LocalDatePipe } from './local-date.pipe';

describe('LocalDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LocalDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns valid date given utc', () => {
    const date = new Date('2018-05-04T08:17:57.8979116Z');

    const pipe = new LocalDatePipe();
    const result = pipe.transform(date, 'DD MMM YYYY HH:mm');
    expect(result).toBe('04 May 2018 09:17');
  });

  it('returns empty string when date is null', () => {
    const date = null;

    const pipe = new LocalDatePipe();
    const result = pipe.transform(date, 'DD MMM YYYY HH:mm');
    expect(result).toBe('');
  });

  it('returns empty string when format is null', () => {
    const date = new Date('2018-05-04T08:17:57.8979116Z');

    const pipe = new LocalDatePipe();
    const result = pipe.transform(date, null);
    expect(result).toBe('');
  });

});
