import { Component, ViewChild } from '@angular/core';
import { Platform, App, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Auth0Cordova from '@auth0/cordova';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { environment } from '@env';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
import { BillsPage } from '@pages/bills/bills';
/** Services. */
import { Storage } from '@ionic/storage';
import { Auth0Service } from '@services/auth0/auth0.service';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { constants } from '@app/app.constants';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;
  // Root page.
  rootPage: any = IndexPage;
  // Pages.
  dashboardPage: any = DashboardPage;
  profilePage: any = ProfilePage;
  productsPage: any = ProductsPage;
  billsPage: any = BillsPage;
  // Attributes.
  picture: string;
  username: string;

  constructor(private platform: Platform, private app: App,
    private menuCtrl: MenuController,
    private translate: TranslateService, private auth0Service: Auth0Service,
    private statusBar: StatusBar, private splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions,
    private events: Events,
    private storage: Storage) {

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
          this.androidPermissions.PERMISSION.CAMERA,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );      

      // Style for dark backgrounds.
      this.statusBar.styleBlackOpaque();
      /* this.statusBar.overlaysWebView(false); */
      // Hide the splash screen.
      this.splashScreen.hide();

      // Set up URL redirects.
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      };
    });

    this.events.subscribe(constants.topics.storage.ready, (value) => {
      // Inicializamos alguna información del usuario.
      this.storage.get('user_information').then(userInformation => {
        if (userInformation) {
          this.picture = userInformation.picture;
          this.username = userInformation.username || userInformation.nickname;
        }
      });
      // Redirect to dashboard.
      if (this.auth0Service.isAuthenticated()) {
        this.setRootPage(this.dashboardPage);
      }
    });
  }

  ngOnInit() {

    this.platform.registerBackButtonAction(() => {
      if (this.getActivePage() === this.profilePage
        || this.getActivePage() === this.productsPage
        || this.getActivePage() === this.billsPage) {
        this.setRootPage(this.dashboardPage);
      } else {
        this.goBack();
      }
    });
  }

  /** Go directly to page cleaning the stack for new navigation. */
  setRootPage(page: any) {
    if (!page) {
      return;
    }
    if (!this.navCtrl) {
      /** console.log('navCtrl undefined.'); */
      return;
    }
    // Set root and clean the navCtrl stack.
    this.navCtrl.setRoot(page);
    // Close menu.
    this.menuCtrl.close();
  }

  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }

  getActivePage(): string {
    if (!this.navCtrl || !this.navCtrl.getActive() || !this.navCtrl.getActive().component) {
      /* console.log('navCtrl undefined'); */
      return '';      
    }
    return this.navCtrl.getActive().component;
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
