import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Auth0Cordova from '@auth0/cordova';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { environment } from '@environments/environment';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
/** Services. */
import { AuthService } from '@services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
    private menuCtrl: MenuController,
    private translate: TranslateService, private authService: AuthService,
    private statusBar: StatusBar, private splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions) {

      // Config supported languages.
      this.translate.addLangs(environment.supportedLanguages);
      // Setup default laanguage.
      this.translate.setDefaultLang('es');
      // Setup the client language.
      if (environment.supportedLanguages.indexOf(this.translate.getBrowserLang()) != -1) {
        this.translate.use(translate.getBrowserLang());
      }
      
      // On platform ready...
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.androidPermissions.requestPermissions(
          [
            this.androidPermissions.PERMISSION.CAMERA
          ]
        );

        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
        // Set up URL redirects.
        (window as any).handleOpenURL = (url : string) => {
          Auth0Cordova.onRedirectUri(url);
        };
        
      });
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
