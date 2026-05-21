# Changelog

## [Unreleased]

## [3.0.0] - 2026-05-21

### Breaking Changes

- Firebase peer dependencies (`@react-native-firebase/app` and `@react-native-firebase/crashlytics`) bumped from `^18.9.0` to `^21.6.1`. Consumer apps must upgrade their Firebase modules before installing this version, otherwise `npm install` will warn about unmet peer dependencies and runtime behavior is not guaranteed.
- Minimum Android `compileSdk` raised to 35 and Java to 17. Consumer apps with older Android toolchains must update Gradle and JDK accordingly.

### Changed

- Updated Firebase peerDependencies from ^18.9.0 to ^21.6.1
- Widened react-native peer dependency range to >=0.71.5 <0.82.0
- Widened react peer dependency range to >=17.0.2 <20.0.0
- Modernized Android build.gradle with safeExtGet pattern, compileSdk 35, minSdk 24 and Java 17
- Standardized Node.js to v22 in .nvmrc and all CI workflows
- Upgraded GitHub Actions to v4 (checkout, setup-node)

### Added

- Beta publish workflow for pre-release branches

## [2.2.0] - 2025-11-05

### Added

- Support for react 19

## [2.1.0] - 2024-04-10

### Added

- Added device id and connection type to analytics tracking data. - [APPSRN-281](https://janiscommerce.atlassian.net/browse/APPSRN-281)

## [2.0.0] - 2023-12-18

### Breaking Changes

### Changed

- No longer returns functions. Now returns a class that it's needed to instance in order to use methods.

## [1.0.1] - 2023-09-26

### Fixed

- Fixed version node in npm publish action

## [1.0.0] - 2023-09-26

### Added

- Added method log
- Added method recordError
- Added method crash
- Added github actions
