import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/** Services. */
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@services/toast/toast.service';
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
    private toastService: ToastService,
    private usersService: UsersService) {

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.updatePasswordFormGroup = new FormGroup({
      passwordFormControl: this.passwordFormControl,
    });
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
      this.toastService.showToast('PROFILE.UPDATE_PASSWORD_SUCCESS_MESSAGE');
      // Close modal.
      this.closeModal();
    }).catch(error => {
      console.log(JSON.stringify(error));
      this.toastService.showDangerToast('PROFILE.UPDATE_PASSWORD_FAILURE_MESSAGE');
    });
  }
}