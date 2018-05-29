import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
/* Services. */
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { Storage } from '@ionic/storage';
import { ScannerService } from '@services/scanner/scanner.service';
/* Pages. */
import { SellPage } from '@pages/sell/sell';
import { CreateProductPage } from '@pages/create-product/create-product';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  // Pages.
  createProductPage: any = CreateProductPage;
  sellPage : any = SellPage;

  /** Attributes. */
  private total: number;
  private price: number;
  private headquarterID: number;
  constructor(public navCtrl: NavController,
    private events: Events,
    private storage: Storage,
    private headquartersService: HeadquartersService,
    private toastService: ToastService,
    private scannerService: ScannerService,
    private translateService: TranslateService) { 
  }

  ionViewDidLoad() {
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation.user_metadata.headquarter.id;
      this.getProducts();
    });
  }
  /** Build a navigation stack from the current root page. */
  pushPage(page: any, params? :any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page, params);
  }

  scann () {
    try{
      this.translateService.get('SCANN.SCANN_MESSAGE').subscribe((response) => {
        this.scannerService.scann(response).then((data) => {
          var params = JSON.parse(data.text);
          this.pushPage(null, params);
        }, (error) => {
          console.log(JSON.stringify(error));
        });
      });
    } catch(e) {
      console.log(JSON.stringify(e));
    }
    
  }

  private getProducts() {
    this.headquartersService.getProducts(this.headquarterID, "", "", "").then(response => {
      /* console.log(JSON.stringify(response.data)); */
      try {
        var data = JSON.parse(response.data);
        this.total = data.total;
        this.price = data.price;
      }
      catch (e) {
        console.error(JSON.stringify(e));
      }
    }).catch(error => {
      this.toastService.showDangerToast(error.status);
    });
  }
}
