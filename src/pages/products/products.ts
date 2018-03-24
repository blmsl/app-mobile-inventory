import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  
  public filterVisible : boolean = false;

  constructor(public navCtrl: NavController) {
    
  }
  
  public getItems(ev: any) : any {
  }
  
  public filterDropdown() : any {
    let items = document.getElementsByClassName('filter-item') as HTMLCollectionOf<HTMLElement>;
    if (items.length != 0) {
      for (let item of items) {
        if (item.style.display === 'block') {
          item.style.display = 'none';
          this.filterVisible = false;
        } else {
          item.style.display = 'block'
          this.filterVisible = true;
        }
      }
    }
  }
}
