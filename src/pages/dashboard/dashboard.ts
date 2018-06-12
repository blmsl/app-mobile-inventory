import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
/* Services. */
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { Storage } from '@ionic/storage';
import { ScannerService } from '@services/scanner/scanner.service';
/* Pages. */
import { CreateBillPage } from '@pages/create-bill/create-bill';
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
  public createProductPage: any = CreateProductPage;
  public createBillPage: any = CreateBillPage;
  public productDetailsPage: any = ProductDetailsPage;

  /** Attributes. */
  private total: number;
  private cost: number;
  private revenue: number;
  private headquarterID: number;

  public rangeVisible: boolean = false;
  public today: string;
  public fromDate: string;
  public toDate: string;

  constructor(public navCtrl: NavController,
    private events: Events,
    private storage: Storage,
    private headquartersService: HeadquartersService,
    private toastService: ToastService,
    private scannerService: ScannerService,
    private translateService: TranslateService) {
    // Initialize dates.
    var d = new Date();
    this.today = d.toISOString();
    this.toDate = d.toISOString();
    d.setHours(0);
    this.fromDate = d.toISOString();

    this.events.subscribe(constants.topics.products.create, (value) => {
      // TODO: Optimize this.
      this.getProducts();
    });
    this.events.subscribe(constants.topics.bills.create, (value) => {
      // TODO: Optimize this.
      this.getProducts();
      var d = new Date();
      this.toDate = d.toISOString();
      this.getBills();
    });
  }

  ionViewDidLoad() {
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation.user_metadata.headquarter.id;
      this.getProducts();
      this.getBills();
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
        this.cost = data.cost;
      }
      catch (e) {
        console.error(JSON.stringify(e));
        this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
      }
    }).catch(error => {
      this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
    });
  }

  public getBills() {
    this.headquartersService.getBills(this.headquarterID, this.fromDate, this.toDate).then(response => {
      try {
        /* console.log(JSON.stringify(response.data)); */
        var data = JSON.parse(response.data);
        this.revenue = data.revenue;
      }
      catch (e) {
        console.error(JSON.stringify(e));
        this.toastService.showDangerToast('ERROR.SALES.ERROR_GETTING_BILLS');
      }
    }).catch(error => {
      console.error(JSON.stringify(error));
      this.toastService.showDangerToast('ERROR.SELL.ERROR_GETTING_BILLS');
    });
  }
}
