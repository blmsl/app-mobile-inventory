import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { constants } from '@app/app.constants';
import { Storage } from '@ionic/storage';
/* Services. */

@Component({
    selector: 'page-search-product',
    templateUrl: 'search-product.html'
})
export class SearchProductPage {

    /** Attributes. */
    private headquarterID: number;
    private names: Array<string> = [];

    name: string = '';

    constructor(public navCtrl: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private toastService: ToastService,
        private events: Events,
        private storage: Storage,
        private headquartersService: HeadquartersService) {

    }

    ionViewDidLoad() {
        // Get headquarter ID.
        this.headquarterID = +this.navParams.get('headquarterID');
    }

    selectName(n: string) {
        this.events.publish(constants.topics.products.search, n);
        this.goBack();
    }

    goBack() {
        // Back button action.
        this.navCtrl.pop();
    }

    private getProducts() {

        if (!this.name || this.name.length == 0) {
            this.names = [];
            return;
        }

        this.headquartersService.getProducts(this.headquarterID, this.name, '', '').then(response => {
            /* console.log(JSON.stringify(response.data)); */
            try {
                var data = JSON.parse(response.data);
                var products: any[] = data.products;

                // Clean names.
                this.names = [];
                for (let i = 0; i < products.length; i++) {
                    var product = products[i];
                    if (this.names.indexOf(product.name) == -1) {
                        this.names.push(product.name);
                    }
                }
            }
            catch (e) {
                console.error(JSON.stringify(e));
                this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
            }
        }).catch(error => {
            console.log(JSON.stringify(error));
            this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCTS');
        });
    }
}