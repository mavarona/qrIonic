import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { RecordProvider } from '../../providers/record/record';
import { ScanData } from '../../models/scan-data.model';

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  records: Array<ScanData> = new Array<ScanData>();

  constructor( private _recordProvider: RecordProvider ) {
  }

  ionViewDidLoad() {
    this.records = this._recordProvider.loadRecords();
  }

  openScan ( index: number ) {

    this._recordProvider.openScan( index );

  }

}
