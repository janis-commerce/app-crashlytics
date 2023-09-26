import setAttribute from '../lib/utils/setAttribute';

describe('setAttribute function', () => {
  describe('it works correctly', () => {
    it('when receive strings of key and value', async () => {
      await setAttribute('name', 'value');
    });

    it('when receive array of value it is parsed', async () => {
      await setAttribute('key', ['value']);
    });

    it('when receive string of key null or undefined returns null', async () => {
      expect(await setAttribute(undefined, 'value')).toBe(null);
    });

    it('when receive string of value null or undefined returns null', async () => {
      expect(await setAttribute('key', null)).toBe(null);
    });
  });
});
