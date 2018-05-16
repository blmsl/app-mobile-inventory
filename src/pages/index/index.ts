import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
/** Services.*/
import { Auth0Service } from '@services/auth0/auth0.service';

@Component({
  selector: 'page-indexOf',
  templateUrl: 'index.html'
})
export class IndexPage implements OnInit {
  
  constructor(public navCtrl: NavController, 
    private auth0Service: Auth0Service) {      
  }

  ngOnInit() {    
  }
}