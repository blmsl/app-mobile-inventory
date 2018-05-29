import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/* Services. */
import { HeadquartersService } from '@services/headquarters/headquarters.service';
import { ToastService } from '@services/toast/toast.service';
import { ColorsService } from '@services/colors/colors.service';
import { TranslateService } from '@ngx-translate/core';

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
        private headquartersService: HeadquartersService,
        private navParams: NavParams,
        private colorsService: ColorsService,
        private translateService: TranslateService,
        private toastService: ToastService) {
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
    }

    ionViewDidLoad() {
        this.product = this.navParams.get('product');
        console.log(JSON.stringify(this.product));
        this.visualizingMode();
        // Initialize messages.
        this.translateService.get('PRODUCTS.SELECT_COLOR_MESSAGE').subscribe((response) => {
            this.selectColorMessage = response;
        });
        // Get colors.
        this.getColors();
    }

    goBack() {
        // Back button action.
        this.navCtrl.pop();
    }

    private visualizingMode() {
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

    editProduct() {

    }
}