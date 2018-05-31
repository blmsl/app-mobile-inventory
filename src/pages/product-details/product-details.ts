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

    constructor(private navCtrl: NavController,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private colorsService: ColorsService,
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
        this.updateProductFormGroup = new FormGroup({
            nameFormControl: this.nameFormControl,
            brandFormControl: this.brandFormControl,
            colorFormControl: this.colorFormControl,
            amountFormControl: this.amountFormControl,
            valueFormControl: this.valueFormControl
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
    }

    ionViewDidLoad() {
        this.visualizingMode();
    }

    goBack() {
        // Back button action.
        this.navCtrl.pop();
    }

    private visualizingMode() {
        this.nameFormControl.markAsUntouched();
        this.brandFormControl.markAsUntouched();
        this.colorFormControl.markAsUntouched();
        this.amountFormControl.markAsUntouched();
        this.valueFormControl.markAsUntouched();
        // Disable form.
        this.updateProductFormGroup.disable();
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
        promises.push(this.productsService.updateProduct(this.product.product_id, pr));

        // Update existences.
        var prHeadquarter: HeadquarterProduct = new HeadquarterProduct();
        prHeadquarter.amount = +this.amountFormControl.value;
        promises.push(this.headquartersService.updateProduct(this.product.headquarter_id, this.product.product_id, prHeadquarter));

        // Execute calls.
        Promise.all(promises).then(values => {
            this.toastService.showToast('PRODUCTS.UPDATE_PRODUCT_SUCCESS_MESSAGE');
            // Visualizing mode.
            this.visualizingMode();
            // Update product data for consistency.
            this.product.name = pr.name;
            this.product.brand = pr.brand;
            this.product.color = pr.color;
            this.product.price = +pr.price;
            this.product.amount = +prHeadquarter.amount;
            // Reload product.
            this.loadProduct();
            // TODO: Publish event for products page reload.
            this.events.publish(constants.topics.products.update, '');
        }, error => {
            console.log(JSON.stringify(error));
            this.toastService.showDangerToast('PRODUCTS.UPDATE_PRODUCT_FAILURE_MESSAGE');
            // Reload product.
            this.loadProduct();
        });        
    }
}