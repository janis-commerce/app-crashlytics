import crashlytics from '@react-native-firebase/crashlytics';

/**
 * @function crash
 * @description Cause your app to crash for testing purposes
 * @returns {void}
 * @example
 * import crash from '@janiscommerce/app-crashlytics'
 *
 * // minimum example
 * crash.crashThisApp()
 */

const crashThisApp = () => crashlytics().crash();

export default crashThisApp;
