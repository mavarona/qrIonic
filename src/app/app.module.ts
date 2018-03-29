import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomePage,
         TabsPage,
         RecordPage,
         MapPage
       } from '../pages/inde.pages';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { RecordProvider } from '../providers/record/record';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    RecordPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    RecordPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    RecordProvider,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordProvider
  ]
})
export class AppModule {}
