// jest.setup.js

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-firebase/crashlytics', () =>
  jest.fn().mockImplementation(() => ({
    crash: jest.fn(),
    log: jest.fn(),
    recordError: jest.fn(),
    setAttribute: jest.fn(),
    setAttributes: jest.fn(),
    setUserId: jest.fn(),
    setCrashlyticsCollectionEnabled: jest.fn(),
    isCrashlyticsCollectionEnabled: true,
  })),
);

jest.mock('@janiscommerce/oauth-native', () => ({
  getUserInfo: jest.fn(),
}));
