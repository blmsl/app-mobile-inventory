import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ModalPage } from '@pages/modal/modal'

@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html'
})
export class CreateProductPage {
  // Pages.
  modalPage: any = ModalPage;
  
  /** upload modal elements. */
  private uploadModalTitle : string;
  private uploadModalInputs : any[];
  
  /** create prodict elements. */
  private image : string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
    private translate: TranslateService, private camera: Camera) {
    
    if (!this.uploadModalTitle) {
      this.translate.get('COMMONS.UPLOAD').subscribe((response: string) => {
        this.uploadModalTitle = response;
      });
    }
    
    if (!this.uploadModalInputs) {
      this.uploadModalInputs = [];
      this.translate.get('COMMONS.UPLOAD_IMAGE_FROM_CAMERA').subscribe((response: string) => {
        var label = {id: 'camera', name: response, func: this.uploadFromCamera};
        this.uploadModalInputs.push(label);
      });
      this.translate.get('COMMONS.UPLOAD_IMAGE_FROM_GALLERY').subscribe((response: string) => {
        var label = {id: 'gallery', name: response, func: this.uploadFromGallery};
        this.uploadModalInputs.push(label);
      });
    }
    
  }
  
  goBack() {
    // Back button action.
    this.navCtrl.pop();
  }
  
  selectUploadMethod() {
    let modal = this.modalCtrl.create(this.modalPage, 
      { 
        title: this.uploadModalTitle,
        inputs: this.uploadModalInputs
      });
    modal.present();
  }
  
  public uploadFromCamera : any = function (): void
  { 
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
    .catch(error =>{
      console.error( error );
    });
  };
  
  public uploadFromGallery : any = function (): void 
  { 
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
  

}
