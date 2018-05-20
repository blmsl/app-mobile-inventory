import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/** Services. */
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '@services/users/users.service';
/** Models. */
import { User } from '@models/models';
@Component({
  selector: 'page-password-modal',
  templateUrl: 'password-modal.html'
})
export class PasswordModalPage implements OnInit {
  sub: string;
  /** Form controls. */
  private updatePasswordFormGroup: FormGroup;
  private passwordFormControl: FormControl;
  /** Feedback messages. */
  updatePasswordSuccessMessage: string;
  updatePasswordFailureMessage: string;

  constructor(private navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private usersService: UsersService) {

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.updatePasswordFormGroup = new FormGroup({
      passwordFormControl: this.passwordFormControl,
    });

    // Setup update password feedback messages.
    if (!this.updatePasswordSuccessMessage) {
      this.translate.get('PROFILE.UPDATE_PASSWORD_SUCCESS_MESSAGE').subscribe((response: string) => {
        this.updatePasswordSuccessMessage = response;
      });
    }
    if (!this.updatePasswordFailureMessage) {
      this.translate.get('PROFILE.UPDATE_PASSWORD_FAILURE_MESSAGE').subscribe((response: string) => {
        this.updatePasswordFailureMessage = response;
      });
    }
  }

  ngOnInit() {
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    /* console.log(this.navParams.get('sub')); */
    this.sub = this.navParams.get('sub');
  }


  updatePassword() {
    /* console.log("Update password."); */
    var user: User = new User();
    user.password = this.passwordFormControl.value;
    this.usersService.updateUser(this.sub, user).then(data => {
      let toast = this.toastCtrl.create({
        message:  this.updatePasswordSuccessMessage,
        duration: 3000
      });
      toast.present();
      // Close modal.
      this.closeModal();
    }).catch(error => {
      console.log(JSON.stringify(error));
      let toast = this.toastCtrl.create({
        message:  this.updatePasswordFailureMessage,
        duration: 3000,
        cssClass: "toast-error"
      });
      toast.present();
    });
  }
}