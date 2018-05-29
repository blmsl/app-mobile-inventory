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
import { NgxQRCodeModule } from 'ngx-qrcode2';
/** Components. */
import { MyApp } from './app.component';
/** Pages */
import { IndexPage } from '../pages/index/index';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CreateProductPage } from '@pages/create-product/create-product';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';
import { PasswordModalPage } from '@pages/password-modal/password-modal';
import { QrModalPage } from '@pages/qr-modal/qr-modal';
import { SellPage } from '@pages/sell/sell';
import { ProductDetailsPage } from '@pages/product-details/product-details';
/** Services. */
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Auth0Service } from '@services/auth0/auth0.service';
import { CustomersService } from '@services/customers/customers.service';
import { UsersService } from '@services/users/users.service';
import { ProductsService } from '@services/products/products.service';
import { ColorsService } from '@services/colors/colors.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { ScannerService } from '@services/scanner/scanner.service'
/* Pipes. */
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    DashboardPage,
    CreateProductPage,
    ProfilePage,
    ProductsPage,
    PasswordModalPage,
    QrModalPage,
    SellPage,
    ProductDetailsPage,
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
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    DashboardPage,
    CreateProductPage,
    ProfilePage,
    ProductsPage,
    PasswordModalPage,
    QrModalPage,
    SellPage,
    ProductDetailsPage
  ],
  providers: [
    Auth0Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HTTP,
    Network,
    AndroidPermissions,
    BarcodeScanner,
    CustomersService,
    UsersService,
    ProductsService,
    HeadquartersService,
    ToastService,
    ColorsService,
    CurrencyPipe,
    ScannerService
  ]
})
export class AppModule {}
