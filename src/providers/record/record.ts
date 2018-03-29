import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

@Injectable()
export class RecordProvider {

  private _records: Array<ScanData> = new  Array<ScanData>();

  constructor(public http: HttpClient) {

  }

  addRecord ( text: string ) {

    let data = new ScanData ( text );
    this._records.unshift( data );

  }

  loadRecords () {

    return this._records;

  }

}
