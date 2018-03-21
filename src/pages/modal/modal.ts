import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  
  private title : string = "";
  private message : string = "";
  private inputs: any[] = [];

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    this.title = this.params.get('title');
    this.message = this.params.get('message');
    this.inputs = this.params.get('inputs');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
