import crashlytics from '@react-native-firebase/crashlytics';

/**
 * @function parseParams
 * @description Parses an object, filtering out keys with null or undefined values and converting all values to strings.
 * @param {object} params - The object to be parsed.
 * @returns {object} A new object with non-null and non-undefined values converted to strings.
 * @example
 *
 * const params = {
 *   name: 'John',
 *   age: 30,
 *   city: null,
 *   country: undefined,
 * };
 * const parsedObj = parseParams(params);
 * // params will be { name: 'John', age: '30' }
 */

const parseParams = params => {
  return Object.keys(params).reduce((result, key) => {
    const value = params[key];

    if (value !== null && value !== undefined) result[key] = String(value);

    return result;
  }, {});
};

/**
 * @function setAttributes
 * @description Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.
 * @param {object} params object of attributes
 * @param {string} params.name object name
 * @param {string} params.value object value
 * @throws an error when some required params is not passed
 * @returns {void}
 * @example
 * import {setAttributes} from '@janiscommerce/app-crashlytics'
 * setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
 */

export default setAttributes = async params => {
  try {
    await crashlytics().setAttributes(parseParams(params));
  } catch (error) {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
};
