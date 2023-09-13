import setUserId from '../lib/setUserId';
import * as utils from '../lib/utils';

describe('setUserId function', () => {
  const mockedDevEnv = jest.spyOn(utils, 'isDevEnv');

  describe('thows an error when', () => {
    it('userId is undefined', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setUserId(undefined)).toBe(false);
    });

    it('userId is not string', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setUserId(15)).toBe(false);
    });
  });

  it('it works correctly', async () => {
    const response = await setUserId('test function');
    expect(response).toBeTruthy();
  });
});
