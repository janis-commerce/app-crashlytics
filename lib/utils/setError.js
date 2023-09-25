import crashlytics from '@react-native-firebase/crashlytics';

/**
 * This function records an error in Firebase Crashlytics. If the provided `err` parameter is already an instance of
 * the `Error` class, it is recorded as is. If `err` is a string, it is wrapped in a new `Error` instance before being recorded.
 *
 * @param {Error|string} err - The error to be recorded. Can be either an `Error` object or a string representing the error message.
 * @throws {Error} Throws an error if recording the error in Crashlytics fails.
 * @returns {void}
 * @example

 * // Record an Error object
 * const error = new Error('This is an error message');
 * setError(error);
 *
 * // Record an error message string
 * setError('This is another error message');
 */

export default setError = err => {
  err instanceof Error
    ? crashlytics().recordError(err)
    : crashlytics().recordError(new Error(err));
};
