import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv, isEnabled} from './utils';

/**
 * @function recordError
 * @description Record a JavaScript Error.
 * @param {Error} error Javascript error
 * @param {string | undefined} jsErrorName Error name
 * @throws An error when some required params is not passed
 * @returns {void}
 * @example
 * import {recordError} from '@janiscommerce/app-crashlytics'
 *
 * // minimum example
 * const error = throw Error('params are required');
 * recordError(error)
 *
 * // with error description
 * const error = throw Error('params are required');
 * recordError(error, 'Required params')
 */

const recordError = async (error, jsErrorName) => {
  try {
    /* istanbul ignore next */
    if (!isEnabled) throw new Error('crashlytics is not enabled');
    if (!error) throw new Error('error is required');
    if (!!jsErrorName && typeof jsErrorName !== 'string')
      throw new Error('incorrect type of jsErrorName');

    await crashlytics().recordError(error, jsErrorName);
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
  }
};

export default recordError;
