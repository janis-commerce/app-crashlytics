import setError from '../lib/utils/setError';

describe('setError function', () => {
  describe('it works correctly when', () => {
    it('is Error instance', () => {
      const error = new Error('error mock');
      setError(error);
    });

    it('is not Error instance', () => {
      const error = {error: new Error('error mock')};
      setError(error);
    });
  });
});
