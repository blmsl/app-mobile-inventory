import { Component } from '@angular/core';
import { Platform, App, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { Auth0Cordova } from '@auth0/cordova';

import { environment } from '@environments/environment';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
/** Services. */
import { AuthService } from '@services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Root page.
  rootPage:any = IndexPage;
  // Pages.
  dashboardPage:any = DashboardPage;
  profilePage: any = ProfilePage;
  productsPage: any = ProductsPage;

  constructor(private platform: Platform, private app: App,
    private menuCtrl: MenuController, private loadingCtrl: LoadingController,
    private translate: TranslateService, private authService: AuthService,
    private statusBar: StatusBar, private splashScreen: SplashScreen) {
      
      // Config supported languages.
      this.translate.addLangs(environment.supportedLanguages);
      // Setup default laanguage.
      this.translate.setDefaultLang('es');
      // Setup the client language.
      if (environment.supportedLanguages.indexOf(this.translate.getBrowserLang()) != -1) {
        this.translate.use(translate.getBrowserLang());
      }
      
      // Loading.
      let loading;
      this.translate.get('COMMONS.LOADING').subscribe((response: string) => {
          loading = this.loadingCtrl.create({
            content: response
          });
          loading.present();
      });
      
      // On platform ready...
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
        // Set up URL redirects.
        (<any>window).handleOpenURL = (url) => {
          Auth0Cordova.onRedirectUri(url);
        };
        
        // Dimiss loading.
        if (loading) {
          loading.dismiss();
        }
        
      });
      
      // In case the platform yet ready.
      setTimeout(() => {
        loading.dismiss();
      }, environment.dimissTimeout);
  }
  /** Get nav controller. */
  getNavCtrl(): any {
   return this.app.getActiveNavs()[0];
  }
  
  /** Go directly to page cleaning the stack for new navigation. */
  setRootPage(page: any) {
    if (!page) {
      return;
    }
    let navCtrl = this.getNavCtrl();
    if (!navCtrl) {
      /** console.log('navCtrl undefined.'); */
      return;
    }
    // Set root and clean the nav stack.
    navCtrl.setRoot(page);
    // Close menu.
    this.menuCtrl.close();
  }
  
  getActivePage () : string {
    let navCtrl = this.getNavCtrl();
    if (!navCtrl || !navCtrl.getActive() || !navCtrl.getActive().name) {
      /*console.log('navCtrl undefined');*/
      return 'IndexPage';
    }
    /*console.log(navCtrl.getActive().name);*/
    return navCtrl.getActive().name;
  }
}

