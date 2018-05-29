import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
/* Services. */
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
    selector: 'page-qr-modal',
    templateUrl: 'qr-modal.html'
})
export class QrModalPage {

    private qrData = null;
    private textData = null;
    private encodedData = null;

    constructor(public navCtrl: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private barcodeScanner: BarcodeScanner) {
    }

    ionViewDidLoad() {
        this.qrData = this.navParams.get('qr_data');
        this.textData = JSON.stringify(this.qrData);
        console.log(this.textData);
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.textData).then((data)=> {
            this.encodedData = data;
        }, (error) => {
            console.log(JSON.stringify(error));
        });
    }
}