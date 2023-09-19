import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from '.';

/* istanbul ignore next */
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

export default setAttributes = async params => {
  try {
    if (!Object.keys(params).length)
      throw new Error('object attributes is not should empty');

    await crashlytics().setAttributes(params);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};
