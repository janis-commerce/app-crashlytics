import log from '../lib/log';
import * as isDevEnv from '../lib/utils/isDevEnv';
import * as setError from '../lib/utils/setError';
import * as setLogAttibute from '../lib/utils/setAttribute';
import * as setLogAttibutes from '../lib/utils/setAttributes';

describe('log function', () => {
  const mockedDevEnv = jest.spyOn(isDevEnv, 'default');
  const mockSetAttribute = jest.spyOn(setLogAttibute, 'default');
  const mockSetAttributes = jest.spyOn(setLogAttibutes, 'default');
  jest.spyOn(setError, 'default');

  describe('throws an error when', () => {
    it('message is required and isEnvDev is false', async () => {
      await log(undefined);
    });

    it('message is required and isEnvDev is true', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      await log();
    });

    it('when setAttribute returns an error', async () => {
      mockSetAttribute.mockRejectedValueOnce({message: 'error'});
      await log('error', {name: 'peter'});
    });

    it('when setAttributes returns an error', async () => {
      mockSetAttributes.mockRejectedValueOnce({message: 'error'});
      await log('error', {name: 'peter'});
    });
  });

  describe('it works correctly', () => {
    it('when has message', async () => {
      await log(15);
    });

    it('when has message and attribute', async () => {
      await log('error', {name: 'peter'});
    });

    it('when has message and attributes', async () => {
      await log('error', {info: {name: 'peter'}});
    });

    it('when has message and AttributesCrash', async () => {
      await log('error', {userId: '13231'});
    });

    it('when has error instance', async () => {
      await log('error', {userId: '13231', error: new Error('Error')});
    });
  });
});
