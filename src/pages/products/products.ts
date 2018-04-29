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
}
