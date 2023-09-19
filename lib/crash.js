import crashlytics from '@react-native-firebase/crashlytics';
import {isDevEnv, isEnabled} from './utils';

/**
 * @function crash
 * @description Cause your app to crash for testing purposes
 * @returns {void}
 * @example
 * import {crash} from '@janiscommerce/app-crashlytics'
 * crash()
 */

const crash = async () => {
  try {
    /* istanbul ignore next */
    if (!isEnabled) throw new Error('crashlytics is not enabled');

    await crashlytics().crash();
    return true;
  } catch (error) {
    /* istanbul ignore next */
    if (isDevEnv()) {
      console.error(error.message);
    }
    /* istanbul ignore next */
    return false;
  }
};

export default crash;
