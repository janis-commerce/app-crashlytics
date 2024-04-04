import Crashlytics from '../lib/crashlytics';
import * as deviceInfo from '@janiscommerce/app-device-info';
import * as isDevEnv from '../lib/utils/isDevEnv';
import * as setError from '../lib/utils/setError';
import * as setLogAttibute from '../lib/utils/setAttribute';
import * as setLogAttibutes from '../lib/utils/setAttributes';

describe('Crashlytics class', () => {
  const spyGetNetworkState = jest.spyOn(deviceInfo, 'getNetworkState');
  describe('log function', () => {
    const mockedDevEnv = jest.spyOn(isDevEnv, 'default');
    const mockSetAttribute = jest.spyOn(setLogAttibute, 'default');
    const mockSetAttributes = jest.spyOn(setLogAttibutes, 'default');
    jest.spyOn(setError, 'default');

    describe('throws an error when', () => {
      beforeEach(() => {
        crash = new Crashlytics();
      });

      it('message is required and isEnvDev is false', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});

        await crash.log(undefined);
      });

      it('message is required and isEnvDev is true', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.log();
      });

      it('when setAttribute returns an error', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockSetAttribute.mockRejectedValueOnce({message: 'error'});
        await crash.log('error', {name: 'peter'});
      });

      it('when setAttributes returns an error', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockSetAttributes.mockRejectedValueOnce({message: 'error'});
        await crash.log('error', {name: 'peter'});
      });
    });

    describe('it works correctly', () => {
      describe('and has init userData', () => {
        beforeEach(() => {
          crash = new Crashlytics();
        });

        it('when has message', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log(15);
        });

        it('when has message and attribute', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {name: 'peter'});
        });

        it('when has message and attributes', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {info: {name: 'peter'}});
        });

        it('when has message and AttributesCrash', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {userId: '13231'});
        });

        it('when has error instance', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {
            userId: '13231',
            error: new Error('Error'),
          });
        });
      });

      describe('and has init userData', () => {
        beforeEach(() => {
          crash = new Crashlytics({email: 'email@email.com'});
        });

        it('when has message', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log(15);
        });

        it('when has message and attribute', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {name: 'peter'});
        });

        it('when has message and attributes', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {info: {name: 'peter'}});
        });

        it('when has message and AttributesCrash', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {userId: '13231'});
        });

        it('when has error instance', async () => {
          spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
          await crash.log('error', {
            userId: '13231',
            error: new Error('Error'),
          });
        });
      });
    });
  });

  describe('crash function', () => {
    beforeEach(() => {
      spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
      crash = new Crashlytics();
    });

    it('it works correctly', () => {
      spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
      crash.crashThisApp();
    });
  });

  describe('recordError function', () => {
    const mockedDevEnv = jest.spyOn(isDevEnv, 'default');
    beforeEach(() => {
      crash = new Crashlytics();
    });

    describe('throws an error when', () => {
      it('crashlytics is not enabled', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.recordError(undefined, 'Error name');
      });

      it('error is not correct', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(undefined, 'Error name');
      });

      it('jsErrorName is not string', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'), 15);
      });

      it('attributes is not object', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'), 'Error name', 15);
      });
    });

    describe('it works correctly', () => {
      it(' but no error message', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'));
      });

      it(' but has error message', async () => {
        spyGetNetworkState.mockResolvedValue({networkType: 'wifi'});
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'), 'Error name');
      });
    });
  });
});
