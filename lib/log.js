import crashlytics from '@react-native-firebase/crashlytics';
import {isEnabled, setUserId, setAttribute, setAttributes} from './utils';
import recordError from './recordError';

/**
 * @function log
 * @description Log a message that will appear in any subsequent Crash or Non-fatal error reports
 * @param {string} message context message.
 * @param {object} attributes attributes.
 * @throws an error when some required params is not passed
 * @returns {boolean}
 * @example
 * import {log} from '@janiscommerce/app-crashlytics'
 * log('this is a pda error', {userId: '213213, info:{name: 'pepe', email: pepe@email.com}, error: Error})
 */

const funcToExecute = {
  userId: setUserId,
  error: recordError,
};

const log = (message, attributes = {}) => {
  try {
    /* istanbul ignore next */
    if (!isEnabled) throw new Error('crashlytics is not enabled');
    if (!message) throw new Error('message is required');

    attributes &&
      Object.keys(attributes).map(key => {
        const fn = funcToExecute[key];

        if (fn) return fn(attributes[key]);

        return typeof attributes[key] === 'string'
          ? setAttribute(key, attributes[key])
          : setAttributes(attributes[key]);
      });

    crashlytics().log(String(message));
    return true;
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};

export default log;
