import setAttributes from '../lib/utils/setAttributes';

describe('setAttributed function', () => {
  describe('it works correctly', () => {
    it('when receive object of key and value', async () => {
      await setAttributes({name: 'value'});
    });
  });
});
