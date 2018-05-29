import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class SellPage {
  private sellFormGroup: FormGroup;
  private discountFormControl: FormControl;
  private products : any = [];

  constructor(public navCtrl: NavController) {
    this.discountFormControl = new FormControl('', [
      Validators.required      
    ]);
    this.sellFormGroup = new FormGroup({
      discountFormControl: this.discountFormControl
    });
  }

  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }

  sell() {

  }
}
