
export class ScanData {

  info: string;
  type: string;

  constructor ( text: string ) {

    this.type = 'Not defined';
    this.info = text;

    if ( text.startsWith('http') ) {
      this.type = 'http';
    } else if ( text.startsWith('geo') ) {
      this.type = 'map';
    }

  }

}
