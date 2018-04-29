import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-scann',
  templateUrl: 'scann.html'
})
export class ScannPage implements OnInit {
  // Pages.
  // Scann page can redirecto to details page or sell page.

  constructor(public navCtrl: NavController, private qrScanner: QRScanner) {
    
  }
  
  ngOnInit(){
    this.scann();
  }

  goToPage(page : any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page);
  }
  
  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }
  
  scann() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
         // Camera permission was granted.
         // Start scanning.
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          // Hide camera preview
          this.qrScanner.hide();
          // Stop scanning.
          scanSub.unsubscribe();
         });
         // show camera preview
         this.qrScanner.show();
         // Wait for user to scan something, then the observable callback will be called.
        } else if (status.denied) {
           // Camera permission was permanently denied.
           // you must use QRScanner.openSettings() method to guide the user to the settings page
           // then they can grant the permission from there.
        } else {
          // Permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log(e));
  }
}
