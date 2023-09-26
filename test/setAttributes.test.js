import setAttributes from '../lib/utils/setAttributes';

describe('setAttributed function', () => {
  describe('it works correctly', () => {
    it('when receive object of key and value', async () => {
      await setAttributes({name: 'value'});
    });

    it('when receiving no string values as parameters', async () => {
      await setAttributes({isMale: false, age: 15, admin: 'no'});
    });

    it('when receiving undefined or null are filtered', async () => {
      await setAttributes({isMale: null, age: 15, admin: undefined});
    });
  });
});
