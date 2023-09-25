import setAttribute from '../lib/utils/setAttribute';

describe('setAttribute function', () => {
  describe('it works correctly', () => {
    it('when receive strings of key and value', async () => {
      await setAttribute('name', 'value');
    });
  });
});
