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

import { Camera } from '@ionic-native/camera';
import { QRScanner } from '@ionic-native/qr-scanner';
/*import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';*/

import { MyApp } from './app.component';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CreateProductPage } from '@pages/create-product/create-product';
import { ScannPage } from '@pages/scann/scann';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
/** Services. */
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@services/auth.service';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    DashboardPage,
    CreateProductPage,
    ScannPage,
    ProfilePage,
    ProductsPage,
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
    ProductsPage
  ],
  providers: [
    CookieService,
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    QRScanner
    /*BarcodeScanner*/
  ]
})
export class AppModule {}
