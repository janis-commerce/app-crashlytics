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

export default setAttribute = async (name, value) => {
  try {
    if (!name) throw new Error('name is required');
    if (!value) throw new Error('value is required');

    if (typeof name !== 'string')
      throw new Error('name is invalid, it should be a string');
    if (typeof value !== 'string')
      throw new Error('value is invalid, it should be a string');

    await crashlytics().setAttribute(name, value);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};
