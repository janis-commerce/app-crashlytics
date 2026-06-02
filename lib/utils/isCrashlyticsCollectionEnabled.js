import {
  getCrashlytics,
  isCrashlyticsCollectionEnabled,
} from '@react-native-firebase/crashlytics';

export default isCrashlyticsCollectionEnabled(getCrashlytics());
