import crashlytics from '@react-native-firebase/crashlytics';
import {isEnabled, setError, setAttribute, setAttributes} from './utils';

/**
 * @function log
 * @description Log a message that will appear in any subsequent Crash or Non-fatal error reports
 * @param {string} message Context message.
 * @param {object} attributes Attributes.
 * @param {string} attributes.userIdAattribute User Id.
 * @param {Error} attributes.error Attribute to error records.
 * @param {string|object} attributes[attributes] Attributes that can be either a string or an object.
 * @throws An error when some required params is not passed
 * @returns {void}
 * @example
 * import crash from '@janiscommerce/app-crashlytics'
 *
 * // minimum example
 * crash.log('this is a pda error')
 *
 * // add userId to crashlytics console
 * crash.log('this is a pda error', {userId: '213213})
 *
 *  // recod an error to crashlytics console
 * crash.log('this is a pda error', {error: Error})
 *
 * // add an attribute to crashlytics console
 * crash.log('this is a pda error', {name: 'Pedro'})
 *
 * // add attributes to crashlytics console
 * crash.log('this is a pda error', {info: {name: 'Pedro', email: 'pedro@email.com', age: '38'}})
 */

const funcToExecute = {
  userId: id => crashlytics().setUserId(JSON.stringify(id)),
  error: err => setError(err),
};

const setLogAttributes = async (attributes, key) => {
  try {
    typeof attributes[key] === 'string'
      ? await setAttribute(key, attributes[key])
      : await setAttributes(attributes[key]);
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
  }
};

export default log = (message, attributes = {}) => {
  try {
    /* istanbul ignore next */
    if (!isEnabled) throw new Error('crashlytics is not enabled');
    if (!message) throw new Error('message is required');

    crashlytics().log(JSON.stringify(message));
    attributes &&
      Object.keys(attributes).map(key => {
        const fn = funcToExecute[key];

        if (fn) return fn(attributes[key]);

        return setLogAttributes(attributes, key);
      });
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
  }
};
