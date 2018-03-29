import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage,
         TabsPage,
         RecordPage,
         MapPage
       } from '../pages/inde.pages';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'

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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordProvider
  ]
})
export class AppModule {}
