import setLogAttributes from '../lib/utils/setLogAttributes';
import * as crashlytics from '@react-native-firebase/crashlytics';

describe('setLogAttributes function', () => {
  describe('throws an error when', () => {
    it('arent attributes or key, because attributes is required', async () => {
      await setLogAttributes('red', null);
    });

    it('arent attributes or key, because key is required', async () => {
      await setLogAttributes(null, 'red');
    });

    it('is not add object attributes', async () => {
      await setLogAttributes(15, 'example');
    });

    it('is not add object attributes', async () => {
      await setLogAttributes([], 'example');
    });
  });

  describe('render correctly when', () => {
    it('add object attributes', async () => {
      await setLogAttributes({log: 'example'}, 'example');
    });

    it('add single key value attribute', async () => {
      await setLogAttributes('log', 'example');
    });
  });
});
