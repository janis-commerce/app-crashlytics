import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv, isEnabled, setError} from './utils';

const setLogAttributes = async (attributes, key) => {
  try {
    attributes[key]?.constructor === Object
      ? await setAttributes(attributes[key])
      : await setAttribute(key, attributes[key]);
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
  }
};

class Crashlytics {
  userData = {};

  constructor(data) {
    if (!!data && Object.keys(data).length) {
      this.userData = data;
    }
  }

  /**
   * @function crashThisApp
   * @description Cause your app to crash for testing purposes
   * @returns {void}
   * @example
   * import crash from '@janiscommerce/app-crashlytics'
   *
   * // minimum example
   * crash.crashThisApp()
   */
  crashThisApp() {
    crashlytics().crash();
  }

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
  async recordError(error, jsErrorName) {
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
  }

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
  log(message, attributes = {}) {
    const attributesData = {...this.userData, ...attributes};

    try {
      /* istanbul ignore next */
      if (!isEnabled) throw new Error('crashlytics is not enabled');
      if (!message) throw new Error('message is required');

      crashlytics().log(JSON.stringify(message));

      const funcToExecute = {
        userId: id => crashlytics().setUserId(JSON.stringify(id)),
        error: err => setError(err),
      };
      attributesData &&
        Object.keys(attributesData).map(key => {
          const fn = funcToExecute[key];

          if (fn) return fn(attributesData[key]);

          return setLogAttributes(attributesData, key);
        });
    } catch (error) {
      /* istanbul ignore next */
      if (isDevEnv()) {
        console.error(error.message);
      }
    }
  }
}

export default Crashlytics;
