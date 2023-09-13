import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from './utils';

/**
 * @function log
 * @description Log a message that will appear in any subsequent Crash or Non-fatal error reports
 * @param {string} message context message.
 * @throws an error when some required params is not passed
 * @returns {Promise.<null>}
 * @example
 * import {log} from '@janiscommerce/app-crashlytics'
 * log('this is a pda error')
 */

const log = async message => {
  try {
    if (!message) throw new Error('message is required');
    if (typeof message !== 'string')
      throw new Error('message is invalid, it should be a string');

    await crashlytics().log(message);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};

export default log;
