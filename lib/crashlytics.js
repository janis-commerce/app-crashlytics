import crashlytics from '@react-native-firebase/crashlytics';
import {getUserInfo} from '@janiscommerce/oauth-native';
import {
  isDevEnv,
  isEnabled,
  setAttribute,
  setAttributes,
  setError,
  formatUserData
} from './utils';

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

  constructor(){
    this.initialize();
  }

    /**
   * @function initialize
   * @description initalize data from userData
   * @returns {void}
   * @example
   * import Crashlytics from '@janiscommerce/app-crashlytics'
   * const crash = new Crashlytics()
   *
   * // minimum example
   * crash.initialize()
   */
  async initialize() {
    try {
      /* istanbul ignore next */
      if (!!this.userData && !!Object.keys(this.userData).length) return null;
      
      const userInfo = await getUserInfo();
      this.userData = formatUserData(userInfo);
    } catch (error) {
      /* istanbul ignore next */
      if (isDevEnv()) {
        console.error(error.message);
      }
    }
  }

  /**
   * @function crashThisApp
   * @description Cause your app to crash for testing purposes
   * @returns {void}
   * @example
   * import Crashlytics from '@janiscommerce/app-crashlytics'
   * const crash = new Crashlytics()
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
   * @param {object} attributes Attributes that can be either a string or an object.
   * @throws An error when some required params is not passed
   * @returns {void}
   * @example
   * import Crashlytics from '@janiscommerce/app-crashlytics'
   * const crash = new Crashlytics()
   *
   * // without params
   * const error = throw Error('params are required');
   * crash.recordError(error, 'error-name')
   *
   * // with params
   * const error = throw Error('params are required');
   * crash.recordError(error, 'error-name', {name: Pepe})
   */
  async recordError(error, jsErrorName, attributes = {}) {
    try {
      this.initialize()

      /* istanbul ignore next */
      if (!isEnabled) throw new Error('crashlytics is not enabled');
      if (!error) throw new Error('error is required');
      if (!jsErrorName) throw new Error('jsErrorName is required');
      if (attributes.constructor !== Object)
        throw new Error('attributes should be an object');

      const attributesData = {...attributes, ...this.userData};
      this.log(jsErrorName, attributesData);

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
   * import Crashlytics from '@janiscommerce/app-crashlytics'
   * const crash = new Crashlytics()
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
    
    try {
      this.initialize()
      const attributesData = {...attributes, ...this.userData};
      
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
