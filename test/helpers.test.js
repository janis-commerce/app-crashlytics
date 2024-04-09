import {
  valueIsValidType,
  includesAllProperties,
  validateCoreData,
} from '../lib/utils/helpers.js';
describe('helpers', () => {
  describe('valueIsValidType util', () => {
    it('returns false when receiving a value that is not of type string or number', () => {
      const invalidValues = ['', null, undefined, false];

      invalidValues.forEach(value => {
        expect(valueIsValidType(value)).toBe(false);
      });
    });

    it('returns true when receiving a value that is type string or number', () => {
      const validValues = [5, 'string'];

      validValues.forEach(value => {
        expect(valueIsValidType(value)).toBe(true);
      });
    });
  });

  describe('includesAllProperties util', () => {
    describe('returns false value', () => {
      it('when data is invalid value or an empty object', () => {
        const invalidValues = [{}, '', 10];

        invalidValues.forEach(value => {
          expect(includesAllProperties(value)).toBe(false);
        });
      });

      it('when data not contain all especified required keys', () => {
        expect(
          includesAllProperties({name: 'janis', address: ''}, [
            'name',
            'address',
          ]),
        ).toBe(false);
      });
    });

    describe('returns true value when', () => {
      it('when the properties to validate is not a valid array', () => {
        expect(includesAllProperties({name: 'janis', address: ''}, 3)).toBe(
          true,
        );
      });

      it('when data to validate includes all required properties', () => {
        expect(
          includesAllProperties({name: 'janis', address: 'address'}, [
            'name',
            'address',
          ]),
        ).toBe(true);
      });
    });
  });

  describe('validateCoreData util', () => {
    const validObject = {
      userName: 'username',
      userSurname: 'userSurname',
      userEmail: 'user@janis.im',
      userId: 'janis-123',
      client: 'janis',
      language: 'lang',
      currency: 'currency',
      deviceId: '12345',
      connection: 'wifi',
    };
    it('returns true when the data contain all required coreData properties', () => {
      expect(validateCoreData(validObject)).toBe(true);
    });

    it('returns false when the data contain all required coreData properties', () => {
      expect(validateCoreData({...validObject, client: ''})).toBe(false);
    });

    it('returns false when not receive an object at argument', () => {
      expect(validateCoreData()).toBe(false);
    });
  });
});
