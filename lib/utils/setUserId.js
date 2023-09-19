import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from '.';

/**
 * @function setUserId
 * @description Record a JavaScript Error.
 * @param {string} userId id of user
 * @throws an error when some required params is not passed
 * @returns {boolean}
 * @example
 * import {setUserId} from '@janiscommerce/app-crashlytics'
 * setUserId(user.uid),
 */

export default setUserId = async userId => {
  try {
    if (!userId) throw new Error('userId is required');

    if (typeof userId !== 'string')
      throw new Error('userId is invalid, it should be a string');

    await crashlytics().setUserId(userId);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};
