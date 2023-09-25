import setLogAttributes from '../lib/utils/setLogAttributes';

describe('setLogAttributes function', () => {
  describe('throws an error when', () => {
    it('params is empty', async () => {
      mockedDevEnv.mockReturnValueOnce(true);
      expect(await setLogAttributes({})).toBe(false);
    });
    it('params is empty', async () => {
      mockedDevEnv.mockReturnValueOnce(false);
      expect(await setLogAttributes({})).toBe(false);
    });
  });

  it('it works correctly', async () => {
    mockedDevEnv.mockReturnValueOnce(false);
    const response = await setLogAttributes({name: 'name', value: 'value'});
    expect(response).toStrictEqual(true);
  });
});
