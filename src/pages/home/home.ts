import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'

import { ToastController, Platform } from 'ionic-angular';
import { Cordova } from '@ionic-native/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private barcodeScanner: BarcodeScanner,
               public toastCtrl: ToastController,
               private platform: Platform ) {

  }

  scan () {

    if ( !this.platform.is ('cordova') ){
      return;
    }

    this.barcodeScanner.scan()
        .then( (barCodeData) => {
          console.log("result", barCodeData.text);
          console.log("format", barCodeData.format);
          console.log("cancelled", barCodeData.cancelled);
        }), ( err => {
          console.error("Error: ", err);
          this.showError("Error: " + err );
        });

  }

  showError ( message: string ) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: 2500
    });

    toast.present();

  }

}
