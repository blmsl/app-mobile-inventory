import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { Auth0Cordova } from '@auth0/cordova';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  /**
   * Lenguajes soportados.
   */
  supportedLanguages: Array<string> = ['es'];

  constructor(translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // Config supported languages.
    translate.addLangs(this.supportedLanguages);
    // Setup default laanguage.
    translate.setDefaultLang('es');
    // Setup the client language.
    /*console.log(translate.getBrowserLang());*/
    if (this.supportedLanguages.indexOf(translate.getBrowserLang()) != -1) {
      translate.use(translate.getBrowserLang());
    }
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      // Set up URL redirects.
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };
      
    });
  }
}

