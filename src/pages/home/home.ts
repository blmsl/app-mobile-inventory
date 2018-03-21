import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
/**
import { CodePush, SyncStatus } from '@ionic-native/code-push';
*/

import { CreateProductPage } from '@pages/create-product/create-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Pages.
  createProductPage : any = CreateProductPage;

  constructor(public navCtrl: NavController, private platform: Platform) {
      /**
      // https://www.youtube.com/watch?v=866PN-ccfm4
      this.platform.ready().then(() => {
        
        this.codePush.sync({}, (progress) => {
          
        }).subscribe((status) => {
          if (status == SyncStatus.CHECKING_FOR_UPDATE) {
            alert('Checking for Update.');
          }
          if (status == SyncStatus.DOWNLOADING_PACKAGE) {
            alert('Downloading Package.');
          }
          if (status == SyncStatus.IN_PROGRESS) {
            alert('In Progress.');
          }
          if (status == SyncStatus.INSTALLING_UPDATE) {
            alert('Installing Update');
          }
          if (status == SyncStatus.UP_TO_DATE) {
            alert('Up to Date');
          }
          if (status == SyncStatus.UPDATE_INSTALLED) {
            alert('Update Installed.');
          }
          if (status == SyncStatus.ERROR) {
            alert('Error.');
          }
        });
        
      });
      */
    
  }

  goToPage(page : any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page);
  }
}
