import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalStorageUtil } from '@util/local-storage.util';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  constructor(public navCtrl: NavController, private localStorageUtil: LocalStorageUtil) {
  }
  
  getAvatar() : any {
    return this.localStorageUtil.getAvatar();
  }
}
