import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/** Services */
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductsService } from '@services/products/products.service';

@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html'
})
export class CreateProductPage {
  // Pages.

  /** create product elements. */
  private image: string;
  private productName: string;
  private productBrand: string;
  private productColor: string;
  private productAmount: number;
  private productsValue: number;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private productsService: ProductsService) {

  }

  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }

  public uploadFromCamera: any = function (): void {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 100,
      targetHeight: 100,
      quality: 100
    }
    this.camera.getPicture(options).then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      console.log(this.image);
    })
      .catch(error => {
        console.error(error);
      });
  };

  public uploadFromGallery: any = function (): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.image = imageData;
    }, (err) => {
      console.log(err);
    });
  };

  createProduct() {
    let product = {};
    this.productsService.createProduct(product).then(data => {

    }).catch(error => {
      
    });
  }


}
