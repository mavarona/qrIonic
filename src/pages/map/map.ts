import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  lat: number;
  lng: number;

  constructor( public navParams: NavParams,
               private viewCtrl: ViewController ) {

    let coorsArray = this.navParams.get('coords').split(',');

    this.lat = Number( coorsArray[0].replace("geo","") );
    this.lng = Number( coorsArray[1] );

  }

  closeModal () {

    this.viewCtrl.dismiss();

  }


}
