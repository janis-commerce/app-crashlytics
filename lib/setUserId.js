import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from './utils';

/**
 * @function setUserId
 * @description Record a JavaScript Error.
 * @param {srting} userId id of user
 * @throws an error when some required params is not passed
 * @returns {Promise<null>}
 * @example
 * import {setUserId} from '@janiscommerce/app-crashlytics'
 * setUserId(user.uid),
 */

const setUserId = async userId => {
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

export default setUserId;
