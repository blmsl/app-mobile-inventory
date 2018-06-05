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
import { Storage } from '@ionic/storage';
import { Auth0Service } from '@services/auth0/auth0.service';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { ToastService } from '@services/toast/toast.service';
import { constants } from '@app/app.constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Root page.
  rootPage: any = IndexPage;
  // Pages.
  dashboardPage: any = DashboardPage;
  profilePage: any = ProfilePage;
  productsPage: any = ProductsPage;
  // Attributes.
  picture: string;
  username: string;

  constructor(private platform: Platform, private app: App,
    private menuCtrl: MenuController,
    private translate: TranslateService, private auth0Service: Auth0Service,
    private statusBar: StatusBar, private splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions,
    private events: Events,
    private storage: Storage,
    /* private network: Network, */
    private toastService: ToastService) {

    // On platform ready...
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Config supported languages.
      this.translate.addLangs(environment.supportedLanguages);
      // Setup default laanguage.
      this.translate.setDefaultLang('es');
      // Setup the client language.
      if (environment.supportedLanguages.indexOf(this.translate.getBrowserLang()) != -1) {
        this.translate.use(translate.getBrowserLang());
      }

      this.androidPermissions.requestPermissions(
        [
          this.androidPermissions.PERMISSION.CAMERA
        ]
      );

      platform.registerBackButtonAction(() => {
        if (this.getActivePage() === 'ProfilePage' || this.getActivePage() === 'ProductsPage') {
          this.setRootPage(this.dashboardPage);
        } else {
          this.goBack();
        }
      });

      // Style for dark backgrounds.
      this.statusBar.styleBlackOpaque();
      /* this.statusBar.overlaysWebView(false); */
      // Hode the splash screen.
      this.splashScreen.hide();

      // Set up URL redirects.
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      };
    });

    this.events.subscribe(constants.topics.storage.ready, (value) => {
      // Redirect to dashboard.
      if (this.auth0Service.isAuthenticated()) {
        this.setRootPage(this.dashboardPage);
      }

      this.storage.get('user_information').then(userInformation => {
        if (userInformation) {
          this.picture = userInformation.picture;
          this.username = userInformation.username || userInformation.nickname;
        }
      });
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

  goBack() {
    let navCtrl = this.getNavCtrl();
    // Back button action.
    navCtrl.pop();
  }

  getActivePage(): string {
    let navCtrl = this.getNavCtrl();
    if (!navCtrl || !navCtrl.getActive() || !navCtrl.getActive().name) {
      /* console.log('navCtrl undefined'); */
      return 'IndexPage';
    }
    return navCtrl.getActive().name;
  }

  /* Perform logout action. */
  logout() {
    // Close menu.
    this.menuCtrl.close();
    // Restore session.
    this.auth0Service.logout();
    // Redirect to index.
    this.setRootPage(this.rootPage);
  }
}
