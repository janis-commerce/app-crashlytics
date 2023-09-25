import crashlytics from '@react-native-firebase/crashlytics';

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
    await crashlytics().setAttributes(params);
  } catch (error) {
    /* istanbul ignore next */
    return Promise.reject(error);
  }
};
