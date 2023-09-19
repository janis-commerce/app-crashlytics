import crashlytics from '@react-native-firebase/crashlytics';
import {isEnabled, setUserId, setAttribute, setAttributes} from './utils';
import recordError from './recordError';

/**
 * @function log
 * @description Log a message that will appear in any subsequent Crash or Non-fatal error reports
 * @param {string} message Context message.
 * @param {object} attributes Attributes.
 * @param {string} attributes.userIdAattribute User Id.
 * @param {Error} attributes.error Attribute to error records.
 * @param {string|object} attributes[attributes] Attributes that can be either a string or an object.
 * @throws An error when some required params is not passed
 * @returns {boolean} Returns true if the log was successful.
 * @example
 * import {log} from '@janiscommerce/app-crashlytics'
 *
 * // minimum example
 * log('this is a pda error')
 *
 * // add userId to crashlytics console
 * log('this is a pda error', {userId: '213213})
 *
 *  // recod an error to crashlytics console
 * log('this is a pda error', {error: Error})
 *
 * // add an attribute to crashlytics console
 * log('this is a pda error', {name: 'Pedro'})
 *
 * // add attributes to crashlytics console
 * log('this is a pda error', {info: {name: 'Pedro', email: 'pedro@email.com', age: '38'}})
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

    crashlytics().log(JSON.stringify(message));
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
