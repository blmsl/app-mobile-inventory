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
/**
import { CodePush } from '@ionic-native/code-push';
*/
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
/** pages */
import { HomePage } from '../pages/home/home';
import { CreateProductPage } from '@pages/create-product/create-product';
import { ScannPage } from '@pages/scann/scann';
import { ProfilePage } from '@pages/profile/profile';
import { ProductsPage } from '@pages/products/products';

/** utils */
import { LocalStorageUtil } from '@util/local-storage.util';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateProductPage,
    ScannPage,
    ProfilePage,
    ProductsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    LocalStorageUtil
    /**
    CodePush,
    */
  ]
})
export class AppModule {}
