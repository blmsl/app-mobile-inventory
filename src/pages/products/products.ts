import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
/* Services. */
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '@services/toast/toast.service';
import { ProductsService } from '@services/products/products.service';
import { ColorsService } from '@services/colors/colors.service';
import { TranslateService } from '@ngx-translate/core';
/* Pages. */
import { ProductDetailsPage } from '@pages/product-details/product-details';
import { constants } from '@app/app.constants';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  // Pages.
  private productDetailsPage: any = ProductDetailsPage;

  private filterVisible: boolean = false;
  /** Attributes. */
  private headquarterID: number;
  private products: any = [];
  private brands: any = [];
  private colors: any = [];

  private name: string = '';
  private brand: string = '';
  private color: string = '';

  private selectBrandMessage: string;
  private selectColorMessage: string;


  constructor(public navCtrl: NavController,
    private storage: Storage,
    private toastService: ToastService,
    private translateService: TranslateService,
    private events: Events,
    private colorsService: ColorsService,
    private productsService: ProductsService,
    private headquartersService: HeadquartersService) {
    // Initialize messages.
    this.translateService.get('PRODUCTS.SELECT_BRAND_MESSAGE').subscribe((response) => {
      this.selectBrandMessage = response;
    });
    this.translateService.get('PRODUCTS.SELECT_COLOR_MESSAGE').subscribe((response) => {
      this.selectColorMessage = response;
    });
    // Get brands.
    this.getBrands();
    // Get colors.
    this.getColors();

    this.events.subscribe(constants.topics.products.update, (value) => {
      // TODO: Optimize this.
      this.getProducts();
    });

  }

  ionViewDidLoad() {
    // Get products.
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation.user_metadata.headquarter.id;
      this.getProducts();
    });
  }

  private goToProduct(product: any) {
    if (product) {
      this.navCtrl.push(this.productDetailsPage, { product: product });
    }    
  }

  public filterDropdown(): any {
    let items = document.getElementsByClassName('filter-item') as HTMLCollectionOf<HTMLElement>;;
    if (items.length != 0) {
      for (let i in items) {
        if (!items[i] || !items[i].style) {
          continue;
        }
        if (items[i].style.display === 'block') {
          items[i].style.display = 'none';
          this.filterVisible = false;
        } else {
          items[i].style.display = 'block'
          this.filterVisible = true;
        }
      }
    }
  }

  private getProducts() {
    this.brand = this.brand != this.selectBrandMessage ? this.brand : '';
    this.color = this.color != this.selectColorMessage ? this.color : '';

    this.headquartersService.getProducts(this.headquarterID, this.name, this.brand, this.color).then(response => {
      /* console.log(JSON.stringify(response.data)); */
      try {
        var data = JSON.parse(response.data);
        this.products = data.products;
      }
      catch (e) {
        console.error(JSON.stringify(e));
      }
    }).catch(error => {
      var err = JSON.parse(error);
      this.toastService.showDangerToast(err.status);
    });
  }

  private getBrands() {
    this.productsService.getBrands().then(response => {
      /* console.log(JSON.stringify(response.data)); */
      try {
        var data = JSON.parse(response.data);
        this.brands = data.brands;
      }
      catch (e) {
        console.error(JSON.stringify(e));
      }
    }).catch(error => {
      var err = JSON.parse(error);
      this.toastService.showDangerToast(err.status);
    });
  }

  private getColors() {
    this.colors = this.colorsService.getColors();
  }
}
