import coreData from '../constant/coreData.js';

/**
 * @name valueIsValidType
 * @description is a utility that returns a boolean true value when the argument is a string or a number, otherwise returns false
 * @param {string | number} value is data to validate
 * @returns {boolean}
 * @example
 *
 * valueIsValidType('string') => true;
 * valueIsValidType(3) => true;
 * valueIsValidType(0) => true;
 * valueIsValidType('') => false;
 * valueIsValidType(null) => false;
 */

export const valueIsValidType = value =>
  typeof value === 'number' || (!!value && typeof value === 'string');

/**
 * @name includesAllProperties
 * @param {Object} data is an object with keys that you want to validate.
 * @param {String[]} properties are the keys that you want validate, in addition to those required by default
 * @returns {boolean}
 * @example
 *
 * includesAllProperties({name:'janis'}, ['name','address']) => false;
 * includesAllProperties({name:'janis',address:'costa rica 4988'},  ['name','address']) => true;
 * includesAllProperties({name:'', address: 'costa rica 4988},['name','address']) => false;
 */

export const includesAllProperties = (data, properties = []) => {
  if (!data || !Object.keys(data).length) return false;

  if (!properties || !Array.isArray(properties)) return true;

  const validProperties = properties.filter(prop => typeof prop === 'string');

  const dataKeys = Object.keys(data);

  return validProperties.every(
    value => dataKeys.includes(value) && valueIsValidType(data[value]),
  );
};

/**
 * @name validateCoreData
 * @description This utility validates an object and returns true when all required core data keys are found in it, otherwise, returns false
 * @param {*} data object to be validated
 * @returns {boolean}
 * @example
 * validateCoreData({userName:'janis',userSurname:'fizzmod',userEmail:'janis@janis.im',userId:'janis123',client:'janis',language:'en-us,'currency':'currency'}) => true;
 * validateCoreData({userName:'',userSurname:'',userEmail:'janis@janis.im',userId:'janis123',client:'janis',language:'en-us,'currency':'currency'}) => false;
 * validateCoreData({}) => false;
 */

export const validateCoreData = (data = {}) =>
  includesAllProperties(data, coreData);
