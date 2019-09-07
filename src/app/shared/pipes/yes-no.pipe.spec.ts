import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns Yes given true', () => {
    const pipe = new YesNoPipe();

    const result = pipe.transform(true);

    expect(result).toBe('Yes');
  });

  it('returns No given false', () => {
    const pipe = new YesNoPipe();

    const result = pipe.transform(false);

    expect(result).toBe('No');
  });
});
