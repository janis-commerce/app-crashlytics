import recordError from '../lib/recordError';
import * as utils from '../lib/utils';

describe('recordError function', () => {
  const mockedDevEnv = jest.spyOn(utils, 'isDevEnv');

  describe('thows an error when', () => {
    it('error is not correct', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await recordError(undefined, 'Error name')).toBe(false);
    });

    it('jsErrorName is not string', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
       expect(await recordError(new Error('error'), 15)).toBe(false);
    });
  });

   describe('it works correctly', () => {
      it(' but no error message', async () => {
        mockedDevEnv.mockReturnValueOnce(false);
        const response = await recordError(new Error('error'));
        expect(response).toStrictEqual(true);
      });

      it(' but has error message', async () => {
         mockedDevEnv.mockReturnValueOnce(false);
         const response = await recordError(new Error('error'), 'Error name');
         expect(response).toStrictEqual(true);
       });

   })
});