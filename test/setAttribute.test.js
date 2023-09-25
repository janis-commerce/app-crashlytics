import setAttribute from '../lib/utils/setAttribute';
import * as isEnvDev from '../lib/utils/isDevEnv';

describe('setAttribute function', () => {
  const mockedDevEnv = jest.spyOn(isEnvDev, 'default');

  describe('throws an error when', () => {
    it('name is required and is not passed', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setAttribute(undefined, 'value')).toBe(false);
    });

    it('value is required and is not passed', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setAttribute('name', undefined)).toBe(false);
    });

    it('name is invalid type', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setAttribute(15, 'value')).toBe(false);
    });

    it('value is invalid type', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setAttribute('name', {})).toBe(false);
    });
  });

  describe('it works correctly', () => {
    it(' but no error message', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      const response = await setAttribute('name', 'value');
      expect(response).toStrictEqual(true);
    });
  });
});