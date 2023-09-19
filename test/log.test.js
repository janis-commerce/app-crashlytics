import log from '../lib/log';
import * as isDevEnv from '../lib/utils/isDevEnv';

describe('log function', () => {
  const mockedDevEnv = jest.spyOn(isDevEnv, 'default');

  describe('throws an error when', () => {
    it('message is required and isEnvDev is false', async () => {
      expect(await log(undefined)).toBe(false);
    });

    it('message is required and isEnvDev is true', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await log()).toBe(false);
    });
  });

  describe('it works correctly', () => {
    it('when has message', async () => {
      const result = await log(15);
      expect(result).toBe(true);
    });

    it('when has message and attribute', async () => {
      const result = await log('error', {name: 'peter'});
      expect(result).toBe(true);
    });

    it('when has message and attributes', async () => {
      const result = await log('error', {info: {name: 'peter'}});
      expect(result).toBe(true);
    });

    it('when has message and AttributesCrash', async () => {
      const result = await log('error', {userId: '13231'});
      expect(result).toBe(true);
    });
  });
});
