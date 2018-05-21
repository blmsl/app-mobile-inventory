import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import { ToastController } from 'ionic-angular';
/* Services. */
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {

    constructor(private translate: TranslateService,
        private toastCtrl: ToastController) {
    }

    showToast(key: string) {
        this.translate.get(key).subscribe((translation: string) => {
            let toast = this.toastCtrl.create({
                message: translation,
                duration: 3000
            });
            toast.present();
        });
    }

    showDangerToast(key: string) {
        this.translate.get(key).subscribe((translation: string) => {
            let toast = this.toastCtrl.create({
                message: translation,
                duration: 3000,
                cssClass: "toast-danger"
            });
            toast.present();
        });
    }
}
