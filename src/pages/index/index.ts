import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/** Services.*/
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'page-indexOf',
  templateUrl: 'index.html'
})
export class IndexPage {
  
  constructor(public navCtrl: NavController, 
    private authService: AuthService) {
  }
}
