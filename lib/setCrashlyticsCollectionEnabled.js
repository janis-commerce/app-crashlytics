import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv} from './utils';

/**
 * @function setCrashlyticsCollectionEnabled
 * @description Enable/disable Crashlytics reporting.
 * @param {boolean} enabled crash collection enabled/disabled
 * @throws an error when some required params is not passed
 * @returns {Promise<null>}
 * @example
 * import {setCrashlyticsCollectionEnabled} from '@janiscommerce/app-crashlytics'
 * setCrashlyticsCollectionEnabled(true),
 */

const setCrashlyticsCollectionEnabled = async enabled => {
  try {
    if (!enabled) throw new Error('enabled is required');

    if (typeof enabled !== 'boolean')
      throw new Error('enabled is invalid, it should be a boolean');

    await crashlytics().setCrashlyticsCollectionEnabled(enabled);
    return true;
  } catch (error) {
    if (isDevEnv()) {
      console.error(error.message);
    }
    return false;
  }
};

export default setCrashlyticsCollectionEnabled;
