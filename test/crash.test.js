import crash from '../lib/crash';
import * as isEnvDev from '../lib/utils/isDevEnv';

describe('crash function', () => {
  const mockedDevEnv = jest.spyOn(isEnvDev, 'default');

  describe('it works correctly when', () => {
    it('crashlytics is enabled', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await crash()).toBe(true);
    });

    it('isDevEnv is true', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await crash()).toBe(true);
    });
  });
});
