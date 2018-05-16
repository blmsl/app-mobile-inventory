import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/** Services. */
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  email: string;
  picture: string;
  username: string;

  constructor(public navCtrl: NavController,
    private storage: Storage) {
      this.storage.get('user_information').then(userInformation => {
        this.email = userInformation.email;
        this.picture = userInformation.picture;
        this.username = userInformation.username || userInformation.nickname;
      });
  }
}
