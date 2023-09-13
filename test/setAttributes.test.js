import setAttributes from '../lib/setAttributes';
import * as utils from '../lib/utils';

describe('setAttributes function', () => {
  const mockedDevEnv = jest.spyOn(utils, 'isDevEnv');

  describe('thows an error when', () => {
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
      const response = await setAttributes({ name:'name', value:'value'});
     expect(response).toStrictEqual(true);
   });
});