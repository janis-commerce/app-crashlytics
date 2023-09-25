import log from '../lib/log';
import * as isDevEnv from '../lib/utils/isDevEnv';
import * as setError from '../lib/utils/setError';
import * as setLogAttibutes from '../lib/utils/setLogAttributes';

describe('log function', () => {
  const mockedDevEnv = jest.spyOn(isDevEnv, 'default');
  const mockedSetLogAttibutes = jest.spyOn(setLogAttibutes, 'default');
  jest.spyOn(setError, 'default');

  describe('throws an error when', () => {
    it('message is required and isEnvDev is false', async () => {
      await log(undefined);
    });

    it('message is required and isEnvDev is true', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      await log();
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
  });
});
