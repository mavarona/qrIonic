
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
import { AgmCoreModule } from '@agm/core';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { RecordProvider } from '../providers/record/record';

import { keyMaps } from '../../config/config';

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
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: keyMaps
    })
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
    Contacts,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordProvider
  ]
})
export class AppModule {}
