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
import { constants } from '@app/app.constants';
import { ProductDetailsPage } from '@pages/product-details/product-details';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  // Pages.
  private createProductPage: any = CreateProductPage;
  private sellPage: any = SellPage;
  private productDetailsPage: any = ProductDetailsPage;

  /** Attributes. */
  private total: number;
  private price: number;
  private headquarterID: number;

  public rangeVisible: boolean = false;
  public today: string = new Date().toISOString();
  public fromDate: string = new Date().toISOString();
  public toDate: string = new Date().toISOString();
  
  constructor(public navCtrl: NavController,
    private events: Events,
    private storage: Storage,
    private headquartersService: HeadquartersService,
    private toastService: ToastService,
    private scannerService: ScannerService,
    private translateService: TranslateService) {
    this.events.subscribe(constants.topics.products.create, (value) => {
      // TODO: Optimize this.
      this.getProducts();
    });
  }

  ionViewDidLoad() {
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation.user_metadata.headquarter.id;
      this.getProducts();
    });
  }

  public rangeDropdown(): any {
    this.rangeVisible = this.rangeVisible ? false : true;
  }

  /** Build a navigation stack from the current root page. */
  pushPage(page: any, params?: any) {
    if (!page) {
      return;
    }
    this.navCtrl.push(page, params);
  }

  scann() {
    try {
      this.translateService.get('SCANN.SCANN_MESSAGE').subscribe((response) => {
        this.scannerService.scann(response).then((data) => {
          var params = JSON.parse(data.text);

          this.goToProduct(params);
        }, (error) => {
          console.log(JSON.stringify(error));
          this.toastService.showDangerToast('ERROR.SCANN.ERROR_SCANNING_QR_CODE');
        });
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      this.toastService.showDangerToast('ERROR.SCANN.ERROR_SCANNING_QR_CODE');
    }
  }

  private goToProduct(product: any) {
    if (product) {
      this.navCtrl.push(this.productDetailsPage, { product: product });
    }
  }

  private getProducts() {
    this.headquartersService.getProducts(this.headquarterID, '', '', '').then(response => {
      /* console.log(JSON.stringify(response.data)); */
      try {
        var data = JSON.parse(response.data);
        this.total = data.total;
        this.price = data.price;
      }
      catch (e) {
        console.error(JSON.stringify(e));
        this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
      }
    }).catch(error => {
      this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
    });
  }
}
