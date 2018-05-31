import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/* Services. */
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {
    /* Private attributes. */
    private toast: any;

    constructor(private translate: TranslateService,
        private toastCtrl: ToastController) {
    }

    showToast(key: string) {
        this.translate.get(key).subscribe((translation: string) => {
            this.toast = this.toastCtrl.create({
                message: translation,
                duration: 3000
            });
            this.toast.present();
        });
    }

    showDangerToast(key: string, dimiss? : boolean) {
        dimiss = dimiss || true;
        this.translate.get(key).subscribe((translation: string) => {
            this.toast = this.toastCtrl.create({
                message: translation,
                duration: dimiss? 3000 : null,
                cssClass: "toast-danger"
            });
            this.toast.present();
        });
    }

    dimissToast() {
        if (this.toast) {
            this.toast.dimiss();
        }        
    }
}
