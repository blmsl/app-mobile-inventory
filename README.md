## Installing

### Installing Dependencies

To install the project dependencies execute the following command.

```
$npm install
```
### Add Cordova plugins

You must install the `SafariViewController` plugin from Cordova to be able to use universal login. 

```
$ionic cordova plugin add cordova-plugin-safariviewcontroller
```

The `CustomURLScheme` plugin from Cordova is also required to handle redirects properly. 

```
$ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=com.inventory.system --variable ANDROID_SCHEME=com.inventory.system --variable ANDROID_HOST=inventory-system.auth0.com --variable ANDROID_PATHPREFIX=/cordova/com.inventory.system/callback
```
Now, run this app on a real device or an emulator. Testing the authentication part of this app won't work on a browser. The platform can be `ios` or `android`.

```
$ionic cordova platform add <platform>
```

```
$ionic cordova emulate <platform>
```
## Running

To execute the application execute the following command. Be sure to have ports 8080, 8081 and 8082 free otherwise the application can not be deployed.

```
$npm start run
```