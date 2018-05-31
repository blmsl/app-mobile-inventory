import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/** Services */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductsService } from '@services/products/products.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { Storage } from '@ionic/storage';
import { ToastService } from '@services/toast/toast.service';
import { ColorsService } from '@services/colors/colors.service';
import { TranslateService } from '@ngx-translate/core';
import { ScannerService } from '@services/scanner/scanner.service';
/* Models */
import { Product, HeadquarterProduct } from '@models/models';
/* Pages. */
import { QrModalPage } from '@pages/qr-modal/qr-modal';
import { constants } from '@app/app.constants';


@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html'
})
export class CreateProductPage {
  /* Pages. */
  private qrModalPage: any = QrModalPage;

  private headquarterID: number;

  private image: string;
  /** Form controls. */
  private createProductFormGroup: FormGroup;
  private nameFormControl: FormControl;
  private brandFormControl: FormControl;
  private colorFormControl: FormControl;
  private selectColorMessage: string;
  private colors: any = [];
  private amountFormControl: FormControl;
  private integerPattern: any = /^\d+$/;
  private valueFormControl: FormControl;

  constructor(private modalCtrl: ModalController,
    public navCtrl: NavController,
    private camera: Camera,
    private storage: Storage,
    private toastService: ToastService,
    private translateService: TranslateService,
    private scannerService: ScannerService,
    private colorsService: ColorsService,
    private events: Events,
    private productsService: ProductsService,
    private headquartersService: HeadquartersService) {
    // Initialize form controls.
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
    // Get colors.
    this.getColors();
  }

  ionViewDidLoad() {
    this.storage.get('user_information').then(userInformation => {
      this.headquarterID = userInformation.user_metadata.headquarter.id;
    });
    // Initialize messages.
    this.translateService.get('PRODUCTS.SELECT_COLOR_MESSAGE').subscribe((response) => {
      this.selectColorMessage = response;
    });
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
    product.color = this.colorFormControl.value != this.selectColorMessage ? this.colorFormControl.value : '';
    product.price = +this.valueFormControl.value;

    this.productsService.createProduct(product).then(response => {
      /* console.log(JSON.stringify(response)); */
      var productData = JSON.parse(response.data);
      var headquarterProduct = new HeadquarterProduct();
      headquarterProduct.headquarter_id = +this.headquarterID;
      headquarterProduct.product_id = +productData.id;
      headquarterProduct.amount = +this.amountFormControl.value;
      /* console.log(JSON.stringify(headquarterProduct)); */

      this.headquartersService.addProduct(this.headquarterID, headquarterProduct).then(response => {
        this.toastService.showToast('PRODUCTS.CREATE_SUCCESS_MESSAGE');
        // Limpiamos el formulario.
        this.createProductFormGroup.reset();

        var headquarterProductData = JSON.parse(response.data);
        // Build the qr code data.
        var qrData: any = {
          product: productData,
          headquarterProduct: headquarterProductData
        };

        this.scannerService.encode(qrData);

        // Publish product created event.
        this.events.publish(constants.topics.products.create, '');
      }).catch(error => {
        console.error(JSON.stringify(error));
        this.toastService.showDangerToast('PRODUCTS.CREATE_FAILURE_MESSAGE');
      });
    }).catch(error => {
      console.error(JSON.stringify(error));
      this.toastService.showDangerToast('PRODUCTS.CREATE_FAILURE_MESSAGE');
    });
  }

  private getColors() {
    this.colors = this.colorsService.getColors();
  }

  public openQrModal(qrData: any) {
    var data = { qr_data: qrData };
    var modalPage = this.modalCtrl.create(this.qrModalPage, data);
    modalPage.present();
  }

}
