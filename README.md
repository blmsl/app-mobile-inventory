# AppMobileInventory

GoStock mobile application.

The APK will not be published until a more mature version of the system is released. It will be available on the CD.

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

Run `ionic cordova run android --device --{IONIC_ENV} -l -c -s`. IONIC_ENV refers to `dev` or `prod`.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE.md](https://github.com/alobaton/app-mobile-inventory/blob/master/LICENSE) file for detail

# Resources

* [Publishing your app](https://ionicframework.com/docs/v1/guide/publishing.html)
* [Launcher Icon Generator](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=clipart&foreground.clipart=android&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher)
