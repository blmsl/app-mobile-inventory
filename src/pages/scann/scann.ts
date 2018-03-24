import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scann',
  templateUrl: 'scann.html'
})
export class ScannPage {
  // Pages.
  // Scann page can redirecto to details page or sell page.

  constructor(public navCtrl: NavController) {
    
  }

  goToPage(page : any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page);
  }
  
  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }
}
