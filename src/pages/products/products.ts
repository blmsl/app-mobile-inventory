import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsService } from '@services/products/products.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

  private filterVisible: boolean = false;
  /** Attributes. */
  private products: any = [];
  private headquarterID: number;
  private name: string = '';
  private brand: string = '';
  private color: string = '';

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private productsService: ProductsService,
    private headquartersService: HeadquartersService) {
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation['https://inventory-system-mobile/user_metadata']['headquarter']['id'];
      this.getProducts();
    });
  }

  public getItems(ev: any): any {
    this.getProducts();
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
    this.headquartersService.getProducts(this.headquarterID, this.name, this.brand, this.color).then(response => {
      this.products = response.data.products;
    }).catch(error => {
      console.log(JSON.stringify(error));
    });
  }
}
