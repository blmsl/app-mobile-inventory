import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/** Services */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductsService } from '@services/products/products.service';
import { Product, HeadquarterProduct } from '@models/models';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html'
})
export class CreateProductPage {  
  private headquarterID: number;

  private image: string;
  /** Form controls. */
  private createProductFormGroup: FormGroup;
  private nameFormControl: FormControl;
  private brandFormControl: FormControl;
  private colorFormControl: FormControl;
  private amountFormControl: FormControl;
  private integerPattern: any = /^\d+$/;
  private valueFormControl: FormControl;
  private createSuccessMessage: any;
  private createFailureMessage: any;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private storage: Storage,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private productsService: ProductsService,
    private headquartersService: HeadquartersService) {
    this.nameFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.brandFormControl = new FormControl('', [
    ]);
    this.colorFormControl = new FormControl('', [
    ]);
    this.amountFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.integerPattern)
    ]);
    this.valueFormControl = new FormControl('', [
      Validators.required      
    ]);
    this.createProductFormGroup = new FormGroup({
      nameFormControl: this.nameFormControl,
      brandFormControl: this.brandFormControl,
      colorFormControl: this.colorFormControl,
      amountFormControl: this.amountFormControl,
      valueFormControl: this.valueFormControl
    });

    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation['https://inventory-system-mobile/user_metadata']['headquarter']['id'];
    });

    if (!this.createSuccessMessage) {
      this.translate.get('PRODUCTS.CREATE_SUCCESS_MESSAGE').subscribe((response: string) => {
        this.createSuccessMessage = response;
      });
    }
    if (!this.createFailureMessage) {
      this.translate.get('PRODUCTS.CREATE_FAILURE_MESSAGE').subscribe((response: string) => {
        this.createFailureMessage = response;
      });
    }
  }

  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }

  public uploadFromCamera: any = function (): void {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture(options).then(imageData => {
      // TODO: Upload from camera is not working.
      this.image = `data:image/jpeg;base64,${imageData}`;
      console.log(this.image);
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  };

  public uploadFromGallery: any = function (): void {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    }).catch(error => {
      console.error(JSON.stringify(error));
    });
  };

  createProduct() {
    var product = new Product();
    product.name = this.nameFormControl.value;
    product.brand = this.brandFormControl.value;
    product.color = this.brandFormControl.value;
    product.price = this.valueFormControl.value;

    this.productsService.createProduct(product).then(response => {
      var headquarterProduct = new HeadquarterProduct();
      headquarterProduct.headquarterId = this.headquarterID;
      headquarterProduct.productId = response.data.id;
      headquarterProduct.amount = this.amountFormControl.value;

      this.headquartersService.addProduct(this.headquarterID, headquarterProduct).then (response => {
        let toast = this.toastCtrl.create({
          message:  this.createSuccessMessage,
          duration: 3000
        });
        toast.present();
      }).catch(error => {
        console.error(JSON.stringify(error));
        let toast = this.toastCtrl.create({
          message:  this.createFailureMessage,
          duration: 3000,
          cssClass: "toast-error"
        });
        toast.present();  
      });      
    }).catch(error => {
      console.error(JSON.stringify(error));
      let toast = this.toastCtrl.create({
        message:  this.createFailureMessage,
        duration: 3000,
        cssClass: "toast-error"
      });
      toast.present();
    });
  }


}
