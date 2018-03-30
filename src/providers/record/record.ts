import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts,
         Contact,
         ContactField,
         ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

import { ModalController,
         Platform,
         ToastController } from 'ionic-angular';
import { MapPage } from '../../pages/map/map';

@Injectable()
export class RecordProvider {

  private _records: Array<ScanData> = new  Array<ScanData>();

  constructor(public http: HttpClient,
              private _iab: InAppBrowser,
              private _modalCrtl: ModalController,
              private _contacts: Contacts,
              private _platform: Platform,
              private _toastCtrl: ToastController,
              private _email: EmailComposer) {

  }

  addRecord ( text: string ) {

    let data = new ScanData ( text );
    this._records.unshift( data );
    this.openScan(0);

  }

  loadRecords () {

    return this._records;

  }

  openScan ( index: number ) {

    let scanData = this._records[index];

    switch ( scanData.type ) {

      case "http":
        this._iab.create( scanData.info, '_system' );
        break;
      case "map":
        this._modalCrtl.create( MapPage, { coords: scanData.info } )
                       .present();
        break;
      case "contact":
        this.createContact( scanData.info );
        break;
      case "email":
        let dataEmail: Array<string> = new Array<string>();
        dataEmail = scanData.info.split(';');
        console.log(dataEmail[0].replace('MATMSG:TO:',''));
        console.log(dataEmail[1].replace('SUB:',''));
        console.log(dataEmail[2].replace('BODY:',''));

        let email = {
          to: dataEmail[0].replace('MATMSG:TO:',''),
          subject: dataEmail[1].replace('SUB:',''),
          body: dataEmail[2].replace('BODY:',''),
          isHtml: true
        };

        // Send a text message using default options
        this._email.open(email);

        break;

      default:
        break;

    }

  }

  private createContact( text: string ) {

    let fields : any = this.parse_vcard ( text );

    let name = fields.fn
    let tfn = fields.tel[0].value[0];

    if ( !this._platform.is('cordova') ) {
      console.log('Not in mobile device, can not insert contact');
      return;
    }

    let contact: Contact = this._contacts.create();

    contact.name = new ContactName(null, name);
    contact.phoneNumbers = [ new ContactField('mobile', tfn) ];

    contact.save()
           .then( () => {
             this.showMessage('Contact ' + name + ' created!');
           },(err) => this.showMessage('Error: ' + err));

  }

  private showMessage ( message: string ) {

    this._toastCtrl.create({
      message: message,
      duration: 2500
    }).present();

  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};


}
