import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/* Services. */
import { ToastService } from '@services/toast/toast.service';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { Storage } from '@ionic/storage';
/* Pages. */
import { BillDetailsPage } from '@pages/bill-details/bill-details';

@Component({
    selector: 'page-bills',
    templateUrl: 'bills.html'
})
export class BillsPage {
    /* Pages. */
    private billDetailsPage: any = BillDetailsPage;

    /** Attributes. */
    private headquarterID: number;
    public bills: any[] = [];

    constructor(public navCtrl: NavController,
        private toastService: ToastService,
        private storage: Storage,
        private headquartersService: HeadquartersService) {
    }

    ionViewDidLoad() {
        // Get products.
        this.storage.get('user_information').then(userInformation => {
            this.headquarterID = userInformation.user_metadata.headquarter.id;
            this.getBills();
        });
    }

    goToBill(bill: any) {
        if (bill) {
            this.navCtrl.push(this.billDetailsPage, { bill: bill });
        }
    }

    getBills() {
        // For now bring the sales of the last month.
        var to = new Date();
        var from = new Date(to);
        from.setMonth(to.getMonth() - 1);

        this.headquartersService.getBills(this.headquarterID, from.toISOString(), to.toISOString()).then(response => {
            try {
                console.log(JSON.stringify(response.data));
                var data = JSON.parse(response.data);
                this.bills = data.bills;
            }
            catch (e) {
                console.error(JSON.stringify(e));
                this.toastService.showDangerToast('ERROR.SALES.ERROR_GETTING_BILLS');
            }
        }).catch(error => {
            console.log(JSON.stringify(error));
            this.toastService.showDangerToast('ERROR.SALES.ERROR_GETTING_BILLS');
        });

    }
}