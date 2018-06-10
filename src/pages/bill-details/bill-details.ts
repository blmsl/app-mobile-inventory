import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/* Models. */
import { Bill } from '@models/models';

@Component({
    selector: 'page-bill-details',
    templateUrl: 'bill-details.html'
})
export class BillDetailsPage {

    private sellFormGroup: FormGroup;
    private discountFormControl: FormControl;
    public editing: boolean = false;
    public bill: Bill;

    constructor(public navCtrl: NavController,
        private navParams: NavParams) {
        this.discountFormControl = new FormControl('', [
        ]);
        this.sellFormGroup = new FormGroup({
            discountFormControl: this.discountFormControl
        });
        // Get params.
        this.bill = this.navParams.get('bill');
        this.calculateExtract();
    }

    goBack() {
        // Back button action.
        this.navCtrl.pop();
    }

    calculateExtract() {
        this.bill.subtotal = 0;
        this.bill.total = 0;

        var i = 0;
        for (i; i < this.bill.sales.length; i++) {
            var sale = this.bill.sales[i];
            this.bill.subtotal += sale.amount * sale.product.price;
        }
        this.bill.subtotal = this.bill.subtotal < 0 ? 0 : this.bill.subtotal;

        // Seteamos el descuento.
        this.discountFormControl.setValue(this.bill.discount);

        // Calculamos el total.
        this.bill.total = this.bill.subtotal - this.bill.discount;
        this.bill.total = this.bill.total < 0 ? 0 : this.bill.total;
    }
}