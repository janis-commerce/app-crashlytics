import setAttributes from '../lib/utils/setAttributes';
import * as isEnvDev from '../lib/utils/isDevEnv';

describe('setAttributes function', () => {
  const mockedDevEnv = jest.spyOn(isEnvDev, 'default');

  describe('throws an error when', () => {
    it('params is empty', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setAttributes({})).toBe(false);
    });
    it('params is empty', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setAttributes({})).toBe(false);
    });
  });

  it('it works correctly', async () => {
    mockedDevEnv.mockReturnValueOnce(false);
    const response = await setAttributes({name: 'name', value: 'value'});
    expect(response).toStrictEqual(true);
  });
});
