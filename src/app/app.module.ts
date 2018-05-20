/** Modules. */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function getTranslateFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { LetterAvatarDirective } from '@node_modules/angular2-letter-avatar/directives/letter-avatar.directive';
import { IonicStorageModule } from '@ionic/storage';
/** Components. */
import { MyApp } from './app.component';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CreateProductPage } from '@pages/create-product/create-product';
import { ScannPage } from '@pages/scann/scann';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
import { PasswordModalPage } from '@pages/password-modal/password-modal'
/** Services. */
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Auth0Service } from '@services/auth0/auth0.service';
import { CustomersService } from '@services/customers/customers.service';
import { UsersService } from '@services/users/users.service';
import { ProductsService } from '@services/products/products.service';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    DashboardPage,
    CreateProductPage,
    ScannPage,
    ProfilePage,
    ProductsPage,
    PasswordModalPage,
    LetterAvatarDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,  {
      backButtonIcon: 'arrow-back' ,
      tabsHideOnSubPages: false,
      tabsHighlight: true
      }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (getTranslateFactory),
        deps: [HttpClient]
      }
    }),
    /*NgxQRCodeModule*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    DashboardPage,
    CreateProductPage,
    ScannPage,
    ProfilePage,
    ProductsPage,
    PasswordModalPage
  ],
  providers: [
    Auth0Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HTTP,
    AndroidPermissions,
    QRScanner,
    CustomersService,
    UsersService,
    ProductsService
  ]
})
export class AppModule {}
