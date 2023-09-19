import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv, isEnabled} from './utils';

/**
 * @function recordError
 * @description Record a JavaScript Error.
 * @param {Error} error javascript error
 * @param {string | undefined} jsErrorName error name
 * @throws an error when some required params is not passed
 * @returns {boolean}
 * @example
 * import {recordError} from '@janiscommerce/app-crashlytics'
 * recordError(error, jsErrorName: 'user acount catch')
 * recordError(error)
 */

const recordError = async (error, jsErrorName) => {
  try {
    /* istanbul ignore next */
    if (!isEnabled) throw new Error('crashlytics is not enabled');
    if (!error) throw new Error('error is required');
    if (!!jsErrorName && typeof jsErrorName !== 'string')
      throw new Error('incorrect type of jsErrorName');

    await crashlytics().recordError(error, jsErrorName);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};

export default recordError;
