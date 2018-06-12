import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/* Services. */
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { ColorsService } from '@services/colors/colors.service';
import { TranslateService } from '@ngx-translate/core';
import { Product, HeadquarterProduct } from '@models/models';
import { ProductsService } from '@services/products/products.service';
import { constants } from '@app/app.constants';
import { ScannerService } from '@services/scanner/scanner.service';

@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
    private editing: boolean = false;

    private product: any;

    /** Form controls. */
    private updateProductFormGroup: FormGroup;
    private nameFormControl: FormControl;
    private brandFormControl: FormControl;
    private colorFormControl: FormControl;
    private selectColorMessage: string;
    private colors: any = [];
    private amountFormControl: FormControl;
    private integerPattern: any = /^\d+$/;
    private valueFormControl: FormControl;
    private costFormControl: FormControl;

    constructor(private navCtrl: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private colorsService: ColorsService,
        private scannerService: ScannerService,
        private translateService: TranslateService,
        private toastService: ToastService,
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
        this.costFormControl = new FormControl('', [
            Validators.required
        ]);
        this.updateProductFormGroup = new FormGroup({
            nameFormControl: this.nameFormControl,
            brandFormControl: this.brandFormControl,
            colorFormControl: this.colorFormControl,
            amountFormControl: this.amountFormControl,
            valueFormControl: this.valueFormControl,
            costFormControl: this.costFormControl
        });
        // Initialize messages.
        this.translateService.get('PRODUCTS.SELECT_COLOR_MESSAGE').subscribe((response) => {
            this.selectColorMessage = response;
        });
        // Get colors.
        this.getColors();
        // Get params.
        this.product = this.navParams.get('product');
        /* console.log(JSON.stringify(this.product)); */
        this.getProduct();
    }

    ionViewDidLoad() {
        this.visualizingMode();
    }

    goBack() {
        // Back button action.
        this.navCtrl.pop();
    }

    private visualizingMode() {
        // Disable form.
        this.updateProductFormGroup.disable();
        // Mark controls as untouched.
        this.nameFormControl.markAsUntouched();
        this.brandFormControl.markAsUntouched();
        this.colorFormControl.markAsUntouched();
        this.amountFormControl.markAsUntouched();
        this.valueFormControl.markAsUntouched();
        this.costFormControl.markAsUntouched();
        this.editing = false;
        // Load product.
        this.loadProduct();
    }

    private editingMode() {
        // Enable form.
        this.updateProductFormGroup.enable();
        this.editing = true;
    }

    private getColors() {
        this.colors = this.colorsService.getColors();
    }

    private loadProduct() {
        this.nameFormControl.setValue(this.product.name);
        this.brandFormControl.setValue(this.product.brand);
        this.colorFormControl.setValue(this.product.color);
        this.amountFormControl.setValue(this.product.amount);
        this.valueFormControl.setValue(this.product.price);
        this.costFormControl.setValue(this.product.cost);
    }

    getProduct() {
        // Promises.
        var promises: any[] = [];
        // Get product information.
        promises.push(this.productsService.getProduct(this.product.product_id));
        // Get existences.
        promises.push(this.headquartersService.getProduct(this.product.headquarter_id, this.product.product_id));
        // Do calls.
        Promise.all(promises).then(values => {
            /* console.log(JSON.stringify(values)); */
            // Fetch the values ​​according to the order in which the promises were added.
            var pr = JSON.parse(values[0].data);
            var hpr = JSON.parse(values[1].data);

            // Update product.
            this.updateProduct_(pr, hpr);
            this.loadProduct();
        }, error => {
            console.log(JSON.stringify(error));
            this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_GETTING_PRODUCT');
            this.goBack();
        });
    }

    updateProduct() {
        // Promises.
        var promises: any[] = [];
        // Update product data.
        var pr: Product = new Product();
        pr.id = this.product.product_id;
        pr.name = this.nameFormControl.value;
        pr.brand = this.brandFormControl.value;
        pr.color = this.colorFormControl.value;
        pr.price = +this.valueFormControl.value;
        pr.cost = +this.costFormControl.value;
        promises.push(this.productsService.updateProduct(this.product.product_id, pr));

        // Update existences.
        var hpr: HeadquarterProduct = new HeadquarterProduct();
        hpr.amount = +this.amountFormControl.value;
        promises.push(this.headquartersService.updateProduct(this.product.headquarter_id, this.product.product_id, hpr));

        // Execute calls.
        Promise.all(promises).then(values => {
            this.toastService.showToast('PRODUCTS.UPDATE_PRODUCT_SUCCESS_MESSAGE');
            // Visualizing mode.
            this.visualizingMode();
            // Update product data for consistency.
            this.updateProduct_(pr, hpr);
            // Reload product.
            this.loadProduct();
            // TODO: Publish event for products page reload.
            this.events.publish(constants.topics.products.update, '');
        }, error => {
            console.log(JSON.stringify(error));
            this.toastService.showDangerToast('ERROR.PRODUCTS.ERROR_UPDATING_PRODUCT');
            // Reload product.
            this.loadProduct();
        });
    }

    private updateProduct_(pr: Product, hpr: HeadquarterProduct) {
        this.product.name = pr.name;
        this.product.brand = pr.brand;
        this.product.color = pr.color;
        this.product.price = +pr.price;
        this.product.cost = +pr.cost;
        this.product.amount = +hpr.amount;
    }

    public seeQR() {
        // Build the qr code data.
        var qrData: any = {
            product_id: +this.product.product_id,
            headquarter_id: +this.product.headquarter_id
        };
        this.scannerService.encode(qrData);
    }
}