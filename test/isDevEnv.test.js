import isDevEnv from '../lib/utils/isDevEnv';

describe('isDevEnv function', () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it('should return true if NODE_ENV is not "production"', () => {
    process.env.NODE_ENV = 'development';
    expect(isDevEnv()).toBe(true);
  });

  it('should return false if NODE_ENV is "production"', () => {
    process.env.NODE_ENV = 'production';
    expect(isDevEnv()).toBe(false);
  });
});
