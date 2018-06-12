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
import { CreateBillPage } from '@pages/create-bill/create-bill';
import { ProductDetailsPage } from '@pages/product-details/product-details';
import { SearchProductPage } from '@pages/search-product/search-product';
import { BillsPage } from '@pages/bills/bills';
import { BillDetailsPage } from '@pages/bill-details/bill-details';
/** Services. */
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Auth0Service } from '@services/auth0/auth0.service';
import { CustomersService } from '@services/customers/customers.service';
import { UsersService } from '@services/users/users.service';
import { ProductsService } from '@services/products/products.service';
import { ColorsService } from '@services/colors/colors.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { ScannerService } from '@services/scanner/scanner.service';
import { BillsService } from '@services/bills/bills.services';
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
    CreateBillPage,
    ProductDetailsPage,
    SearchProductPage,
    BillsPage,
    BillDetailsPage
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
    CreateBillPage,
    ProductDetailsPage,
    SearchProductPage,
    BillsPage,
    BillDetailsPage
  ],
  providers: [
    Auth0Service,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HTTP,
    AndroidPermissions,
    BarcodeScanner,
    CustomersService,
    UsersService,
    ProductsService,
    HeadquartersService,
    ToastService,
    ColorsService,
    CurrencyPipe,
    ScannerService,
    BillsService
  ]
})
export class AppModule {}
