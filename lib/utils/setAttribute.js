import crashlytics from '@react-native-firebase/crashlytics';

/**
 * @function setAttribute
 * @description Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.
 * @param {string} name attribute name
 * @param {string} value attribute value
 * @throws an error when some required params is not passed
 * @returns {void}
 * @example
 * import {setAttribute} from '@janiscommerce/app-crashlytics'
 * setAttribute('credits', String(user.credits)),
 */

export default setAttribute = async (name, value) => {
  try {
    if (name === null || name === undefined) return null;
    if (value === null || value === undefined) return null;

    const parseName = String(name);
    const parseValue =
      value?.constructor === Array ? JSON.stringify(value) : String(value);
    await crashlytics().setAttribute(parseName, parseValue);
  } catch (error) {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
};
