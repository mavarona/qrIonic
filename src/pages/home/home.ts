import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'

import { ToastController, Platform } from 'ionic-angular';
import { Cordova } from '@ionic-native/core';

import { RecordProvider } from '../../providers/record/record';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private barcodeScanner: BarcodeScanner,
               public toastCtrl: ToastController,
               private platform: Platform,
               private _recordProvider: RecordProvider ) {

  }

  scan () {

    if ( !this.platform.is ('cordova') ){
      //this._recordProvider.addRecord('http://google.com');
      // this._recordProvider.addRecord('geo:40.5034217,-3.704353900000001');
//       this._recordProvider.addRecord( `BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
      this._recordProvider.addRecord('MATMSG:TO:info@toptrail.es;SUB:Test subject;BODY:ejemplo de mensaje;;');
      return;
    }

    this.barcodeScanner.scan()
        .then( (barCodeData) => {

          if ( !barCodeData.cancelled && barCodeData.text !== null ) {
            this._recordProvider.addRecord ( barCodeData.text );
          }

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
