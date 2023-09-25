import recordError from '../lib/recordError';
import * as isDevEnv from '../lib/utils/isDevEnv';

describe('recordError function', () => {
  const mockedDevEnv = jest.spyOn(isDevEnv, 'default');

  describe('throws an error when', () => {
    it('crashlytics is not enabled', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      await recordError(undefined, 'Error name');
    });

    it('error is not correct', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      await recordError(undefined, 'Error name');
    });

    it('jsErrorName is not string', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      await recordError(new Error('error'), 15);
    });
  });

  describe('it works correctly', () => {
    it(' but no error message', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      await recordError(new Error('error'));
    });

    it(' but has error message', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      await recordError(new Error('error'), 'Error name');
    });
  });
});
