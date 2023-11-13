import Crashlytics from '../lib'; // Assuming this is the correct path to your Crashlytics class
import * as isDevEnv from '../lib/utils/isDevEnv';
import * as setError from '../lib/utils/setError';
import * as setLogAttibute from '../lib/utils/setAttribute';
import * as setLogAttibutes from '../lib/utils/setAttributes';

describe('Crashlytics class', () => {
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
        await crash.log(undefined);
      });

      it('message is required and isEnvDev is true', async () => {
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.log();
      });

      it('when setAttribute returns an error', async () => {
        mockSetAttribute.mockRejectedValueOnce({message: 'error'});
        await crash.log('error', {name: 'peter'});
      });

      it('when setAttributes returns an error', async () => {
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
          await crash.log(15);
        });

        it('when has message and attribute', async () => {
          await crash.log('error', {name: 'peter'});
        });

        it('when has message and attributes', async () => {
          await crash.log('error', {info: {name: 'peter'}});
        });

        it('when has message and AttributesCrash', async () => {
          await crash.log('error', {userId: '13231'});
        });

        it('when has error instance', async () => {
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
          await crash.log(15);
        });

        it('when has message and attribute', async () => {
          await crash.log('error', {name: 'peter'});
        });

        it('when has message and attributes', async () => {
          await crash.log('error', {info: {name: 'peter'}});
        });

        it('when has message and AttributesCrash', async () => {
          await crash.log('error', {userId: '13231'});
        });

        it('when has error instance', async () => {
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
      crash = new Crashlytics();
    });

    it('it works correctly', () => {
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
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.recordError(undefined, 'Error name');
      });

      it('error is not correct', async () => {
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.recordError(undefined, 'Error name');
      });

      it('jsErrorName is not string', async () => {
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'), 15);
      });
    });

    describe('it works correctly', () => {
      it(' but no error message', async () => {
        mockedDevEnv.mockReturnValueOnce(true);
        await crash.recordError(new Error('error'));
      });

      it(' but has error message', async () => {
        mockedDevEnv.mockReturnValueOnce(false);
        await crash.recordError(new Error('error'), 'Error name');
      });
    });
  });
});
