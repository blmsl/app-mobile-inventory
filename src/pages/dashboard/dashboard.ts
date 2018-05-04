import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateProductPage } from '@pages/create-product/create-product';
import { ScannPage } from '@pages/scann/scann';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  // Pages.
  createProductPage : any = CreateProductPage;
  scannPage : any = ScannPage;

  constructor(public navCtrl: NavController) {
    
  }
  /** Build a navigation stack from the current root page. */
  pushPage(page : any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page);
  }
}