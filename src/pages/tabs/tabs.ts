import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HomePage, RecordPage } from '../inde.pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = HomePage;
  tab2: any = RecordPage;

  constructor() {
  }

}
