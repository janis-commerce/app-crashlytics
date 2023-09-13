import setCrashlyticsCollectionEnabled from '../lib/setCrashlyticsCollectionEnabled';
import * as utils from '../lib/utils';

describe('setCrashlyticsCollectionEnabled function', () => {
  const mockedDevEnv = jest.spyOn(utils, 'isDevEnv');

  describe('thows an error when', () => {
    it('enabled is undefined', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setCrashlyticsCollectionEnabled(undefined)).toBe(false);
    });
     
    it('enabled is not boolean type', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setCrashlyticsCollectionEnabled('name')).toBe(false);
    });
  });

   it('it works correctly', async () => {
     mockedDevEnv.mockReturnValueOnce(false);
     const response = await setCrashlyticsCollectionEnabled(true);
     expect(response).toStrictEqual(true);
   });
});