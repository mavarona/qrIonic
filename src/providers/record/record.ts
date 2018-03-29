import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class RecordProvider {

  private _records: Array<ScanData> = new  Array<ScanData>();

  constructor(public http: HttpClient,
              private _iab: InAppBrowser) {

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

      default:
        break;

    }

  }

}
