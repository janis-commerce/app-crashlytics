import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from '.';

/**
 * @function setAttribute
 * @description Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.
 * @param {string} name attribute name
 * @param {string} value attribute value
 * @throws an error when some required params is not passed
 * @returns {boolean}
 * @example
 * import {setAttribute} from '@janiscommerce/app-crashlytics'
 * setAttribute('credits', String(user.credits)),
 */
export const setAttribute = async (name, value) => {
  try {
    await crashlytics().setAttribute(name, value);
  } catch (error) {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
};

/**
 * @function setAttributes
 * @description Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.
 * @param {object} params object of attributes
 * @param {string} params.name object name
 * @param {string} params.value object value
 * @throws an error when some required params is not passed
 * @returns {boolean}
 * @example
 * import {setAttributes} from '@janiscommerce/app-crashlytics'
 * setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
 */
export const setAttributes = async params => {
  try {
    await crashlytics().setAttributes(params);
  } catch (error) {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
};

/**
 * This function accepts either an object of attributes or a string, and logs them to Firebase Crashlytics accordingly.
 * If the parameter is a string, it uses the `setAttribute` function. If it's an object, it uses the `setAttributes` function
 * to log multiple attributes at once.
 *
 * @param {object|string} attributes - The attributes to be logged. Can be either an object or a string.
 * @param {string} [key] - The key indicating the attribute to be logged when `attributes` is a string.
 * @throws {Error} Throws an error if logging to Crashlytics fails.
 * @returns {void}
 * @example
 *
 * // Log a single attribute (string)
 * logAttributes('attributeValue', 'attributeKey');
 *
 * // Log multiple attributes (object)
 * logAttributes({
 *   role: 'admin',
 *   followers: '13',
 *   email: user.email,
 *   username: user.username,
 * });
 */
export default setLogAttributes = async (attributes, key) => {
  try {
    if (!attributes || !key) throw new Error('attributes or key are required');

    typeof attributes[key] === 'string'
      ? await setAttribute(key, attributes[key])
      : await setAttributes(attributes[key]);
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
  }
};
