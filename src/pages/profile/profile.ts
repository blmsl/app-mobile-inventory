import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
/** Services. */
import { Storage } from '@ionic/storage';
import { CustomersService } from '@services/customers/customers.service';
import { PasswordModalPage } from '@pages/password-modal/password-modal';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  // Attributes.
  /* {"sub":"",
  "nickname":"",
  "name":"name@gmail.com",
  "picture":"",
  "updated_at":"yyy-MM-ddThh:mm:ss.msZ",
  "email":"name@gmail.com",
  "email_verified":true,
  "https://inventory-system-mobile/customer_id":"",
  "https://inventory-system-mobile/app_metadata":
  {"authorization":
  {"roles":["role"]},
  "customer_id":""},
  "app_metadata":
  {"authorization":
  {"roles":["role"]},
  "customer_id":""}} */
  sub: string;
  email: string;
  picture: string;
  username: string;
  // Pages.
  passwordModalPage: any = PasswordModalPage;

  constructor(public modalCtrl: ModalController,
    private storage: Storage,
    private customersService: CustomersService
  ) {
    this.storage.get('user_information').then(userInformation => {
      this.sub = userInformation.sub;
      this.email = userInformation.email;
      this.picture = userInformation.picture;
      this.username = userInformation.username || userInformation.nickname;
    });
  }

  public openUpdatePasswordModal() {
    var data = { sub : this.sub };
    var modalPage = this.modalCtrl.create(
      this.passwordModalPage, data);
    modalPage.present();
  }
}
