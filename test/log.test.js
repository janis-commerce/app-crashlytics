import log from '../lib/log';
import * as utils from '../lib/utils';

describe('log function', () => {
  const mockedDevEnv = jest.spyOn(utils, 'isDevEnv');

  describe('thows an error when', () => {
    it('message is undefined', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await log(undefined)).toBe(false);
    });

    it('message is not string', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await log(15)).toBe(false);
    });
  });

  it('it works correctly', async () => {
    mockedDevEnv.mockReturnValueOnce(false);
    const response = await log('test message');
    expect(response).toStrictEqual(true);
  });
});
