import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/* Models. */
import { Bill, Sale, Product } from '@models/models';
/* Services. */
import { Storage } from '@ionic/storage';
import { BillsService } from '@services/bills/bills.services';
import { TranslateService } from '@ngx-translate/core';
import { ScannerService } from '@services/scanner/scanner.service';
import { ProductsService } from '@services/products/products.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { constants } from '@app/app.constants';

@Component({
  selector: 'page-create-bill',
  templateUrl: 'create-bill.html'
})
export class CreateBillPage {
  private sub: string;
  private headquarterID: number;

  private sellFormGroup: FormGroup;
  private discountFormControl: FormControl;
  private products: any = [];

  private subtotal: number = 0;
  private discount: number = 0;  
  private total: number = 0; 

  constructor(public navCtrl: NavController,
    private translateService: TranslateService,
    private scannerService: ScannerService,
    private toastService: ToastService,
    private storage: Storage,
    private events: Events,
    private productsService: ProductsService,
    private headquartersService: HeadquartersService,
    private billsService: BillsService) {
    this.discountFormControl = new FormControl('', [
    ]);
    this.sellFormGroup = new FormGroup({
      discountFormControl: this.discountFormControl
    });
    
  }

  ionViewDidLoad() {
    this.storage.get('user_information').then(userInformation => {
      this.sub = userInformation.sub;
      this.headquarterID = userInformation.user_metadata.headquarter.id;
    });
  }

  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }

  addProduct() {
    try {
      this.translateService.get('SCANN.SCANN_MESSAGE').subscribe((response) => {
        this.scannerService.scann(response).then((data) => {
          var params = JSON.parse(data.text);

          /* console.log(JSON.stringify(this.products)); */
          if (this.contains(params.product_id)) {
            this.toastService.showToast('SELL.PRODUCT_ALREADY_ADDED');
          } else {
            this.getProduct(params.headquarter_id, params.product_id);
          }          
        }, (error) => {
          console.log(JSON.stringify(error));
          this.toastService.showDangerToast('ERROR.SELL.ERROR_ADDING_PRODUCT');
        });
      });
    } catch (e) {
      console.log(JSON.stringify(e));
      this.toastService.showDangerToast('ERROR.SELL.ERROR_ADDING_PRODUCT');
    }
  }

  getProduct(headquarterID: number, productID: number) {
    // Promises.
    var promises: any[] = [];
    // Get product information.
    promises.push(this.productsService.getProduct(productID));
    // Get existences.
    promises.push(this.headquartersService.getProduct(headquarterID, productID));
    // Do calls.
    Promise.all(promises).then(values => {
      /* console.log(JSON.stringify(values)); */
      // Fetch the values ​​according to the order in which the promises were added.
      var pr = JSON.parse(values[0].data);
      var hpr = JSON.parse(values[1].data);

      // Validate stock.
      if (hpr.amount == 0) {
        this.toastService.showDangerToast('ERROR.SELL.ERROR_VALIDATING_STOCK');
        return;
      }

      var product = {
        product_id: pr.id,
        name: pr.name,
        brand: pr.brand,
        color: pr.color,
        price: +pr.price,
        amount: +hpr.amount,
        amount_: 1
      };
      // Add product.
      this.products.push(product);
      
      // Actualizamos el total.
      this.calculateExtract();
    }, error => {
      console.log(JSON.stringify(error));
      this.toastService.showDangerToast('ERROR.SELL.ERROR_ADDING_PRODUCT');
    });
  }

  increaseAmount(product: any) {
    if (product.amount_ < product.amount) {
      product.amount_ += 1;
      // Actualizamos el total.
      this.calculateExtract();
    }    
  }

  decreaseAmount(product: any) {
    if (0 < product.amount_) {
      product.amount_ -= 1;
      // Actualizamos el total.
      this.calculateExtract();
    }    
  }

  calculateExtract() {    
    this.subtotal = 0;
    this.discount = 0;
    this.total = 0;

    var i = 0;
    for (i; i < this.products.length; i++) {
      var pr = this.products[i];
      this.subtotal += pr.amount_ * pr.price;
    }
    this.subtotal = this.subtotal < 0? 0 : this.subtotal;

    //  Aplicamos el descuento.
    this.discount = +this.discountFormControl.value;
    this.discount = this.discount < 0 || this.discount > this.subtotal? 0 : this.discount;

    // Calculamos el total.
    this.total = this.subtotal - this.discount;
    this.total = this.total < 0? 0 : this.total;
  }

  contains(productID: number): boolean {
    var i = 0;
    for (i; i < this.products.length; i++) {
      var pr = this.products[i];
      if (pr.product_id == productID) {
        return true;
      }
    }
    return false;
  }

  removeProduct(product: any) {
    this.products = this.products.filter(product_ => product_.product_id !==  product.product_id);
  }

  sell() {

    var bill : Bill = new Bill();
    bill.user_id = this.sub;
    bill.headquarter_id = this.headquarterID;
    bill.sales = [];
    // Configuramos las ventas.
    var i = 0;
    for (i; i < this.products.length; i++) {
      var pr = this.products[i];

      var sale : Sale = new Sale();
      sale.amount = pr.amount_;
      sale.product = new Product();
      sale.product.id = pr.product_id;

      bill.sales.push(sale);
    }

    /* console.log(JSON.stringify(bill)); */

    this.billsService.createBill(bill).then(response => {
      this.toastService.showToast('SELL.CREATE_SUCCESS_MESSAGE');
      // Publish event.
      this.events.publish(constants.topics.bills.create, '');
    }).catch(error => {
      console.log(JSON.stringify(error));
      this.toastService.showDangerToast('ERROR.SELL.ERROR_CREATING_BILL');
    });
  }
}
