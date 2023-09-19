# @janiscommerce/app-crashlytics

![janis-logo](brand-logo.png)

Library of methods to report when the app crashes.



## Firebase setting

Before getting started, you should have set up a [new firebase project](https://console.firebase.google.com/).

If you already have it set up, the next step to do would be to add the google-services.json file to the root directory of your module (/android/app).

### Add the firebase sdk

For the Firebase SDKs to be able to access the google-services.json configuration values, you need the Google Services Gradle plugin.

Add the plugin as a dependency to your project-level build.gradle file: (android/build.gradle)

```javascript
dependencies {
        // ...
        classpath("com.google.gms:google-services:4.3.15")
        classpath("com.google.firebase:firebase-crashlytics-gradle:2.9.9")
    } 
    
```

You should also add google services plugins in **android/app/build.gradle** and any Firebase SDKs you want to use in your app:

```javascript
plugins {
  // ...

  // Add the Google services Gradle plugin
  id("com.google.gms.google-services")
  id("com.google.firebase.crashlytics")
}

dependencies {
  // Import the Firebase BoM
  implementation platform('com.google.firebase:firebase-bom:32.2.2')


  // Add the dependencies for any other desired Firebase products
  // https://firebase.google.com/docs/android/setup#available-libraries
}

// Additionally you should make one optional configuration

// It reporting allows you to capture Native Development Kit crashes,
// e.g. in React Native this will capture crashes originating from the Yoga layout engine
android {
        // ...
        buildTypes {
          // ...
          release {
            // ...
            firebaseCrashlytics {
                nativeSymbolUploadEnabled true
                unstrippedNativeLibsDir 'build/intermediates/merged_native_libs/release/out/lib'
            }
          }
        }
    } 
```

You may need to add this in **android/settings.gradle**:

```javascript
  // ...
  include ':@react-native-firebase_app'
  project(':@react-native-firebase_app').projectDir = new File(rootProject.projectDir, './../node_modules/@react-native-firebase/app/android')

```

### Add the firebase file configuration 

Add the **firebase.json** file to the root of your project, with:

```javascript
  {
    "react-native": {
      "crashlytics_debug_enabled": true,
    }
  }

```


### Clean the project

```sh
cd android && ./gradlew clean && cd ..
```


## PeerDependencies Installation

For the methods of this library to work, the following dependencies must be installed:

```sh
npm install @react-native-firebase/app
```
The @react-native-firebase/app module must be installed before using any other Firebase service.

Additionally, you need to install the dependency of the firebase service you want to use. 
For example this:

```sh
npm install @react-native-firebase/crashlytics
```
This dependency will allow that, when executing the methods of the package, these can be registered as events in firebase

## Installation

```sh
npm install @janis-commerce/app-crashlytics
```
## Usage

## Functions

<dl>
<dt><a href="#crash">crash()</a> ⇒ <code>void</code></dt>
<dd><p>Cause your app to crash for testing purposes</p>
</dd>
<dt><a href="#log">log(message)</a> ⇒ <code>boolean</code></dt>
<dd><p>Log a message that will appear in any subsequent Crash or Non-fatal error reports</p>
</dd>
<dt><a href="#recordError">recordError(error, jsErrorName)</a> ⇒ <code>boolean</code></dt>
<dd><p>Record a JavaScript Error.</p>
</dd>
<dt><a href="#setAttribute">setAttribute(name, value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.</p>
</dd>
<dt><a href="#setAttributes">setAttributes(params)</a> ⇒ <code>boolean</code></dt>
<dd><p>Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.</p>
</dd>
<dt><a href="#setCrashlyticsCollectionEnabled">setCrashlyticsCollectionEnabled(enabled)</a> ⇒ <code>boolean</code></dt>
<dd><p>Enable/disable Crashlytics reporting.</p>
</dd>
<dt><a href="#setUserId">setUserId(userId)</a> ⇒ <code>boolean</code></dt>
<dd><p>Record a JavaScript Error.</p>
</dd>
</dl>

<a name="crash"></a>

## crash() ⇒ <code>void</code>
Cause your app to crash for testing purposes

**Kind**: global function  
**Example**  
```js
import {crash} from '@janiscommerce/app-crashlytics'
crash()
```
<a name="log"></a>

## log(message) ⇒ <code>boolean</code>
Log a message that will appear in any subsequent Crash or Non-fatal error reports

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | context message. |

**Example**  
```js
import {log} from '@janiscommerce/app-crashlytics'
log('this is a pda error')
```
<a name="recordError"></a>

## recordError(error, jsErrorName) ⇒ <code>boolean</code>
Record a JavaScript Error.

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | javascript error |
| jsErrorName | <code>string</code> \| <code>undefined</code> | error name |

**Example**  
```js
import {recordError} from '@janiscommerce/app-crashlytics'
recordError(error, jsErrorName: 'user acount catch')
recordError(error)
```
<a name="setAttribute"></a>

## setAttribute(name, value) ⇒ <code>boolean</code>
Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | attribute name |
| value | <code>string</code> | attribute value |

**Example**  
```js
import {setAttribute} from '@janiscommerce/app-crashlytics'
setAttribute('credits', String(user.credits)),
```
<a name="setAttributes"></a>

## setAttributes(params) ⇒ <code>boolean</code>
Sets a string value to be associated with the given attribute name which will be visible in the Firebase Crashlytics console.

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | object of attributes |
| params.name | <code>string</code> | object name |
| params.value | <code>string</code> | object value |

**Example**  
```js
import {setAttributes} from '@janiscommerce/app-crashlytics'
setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
```
<a name="setCrashlyticsCollectionEnabled"></a>

## setCrashlyticsCollectionEnabled(enabled) ⇒ <code>boolean</code>
Enable/disable Crashlytics reporting.

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | crash collection enabled/disabled |

**Example**  
```js
import {setCrashlyticsCollectionEnabled} from '@janiscommerce/app-crashlytics'
setCrashlyticsCollectionEnabled(true),
```
<a name="setUserId"></a>

## setUserId(userId) ⇒ <code>boolean</code>
Record a JavaScript Error.

**Kind**: global function  
**Throws**:

- an error when some required params is not passed


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | id of user |

**Example**  
```js
import {setUserId} from '@janiscommerce/app-crashlytics'
setUserId(user.uid),
```
