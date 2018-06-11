import { Injectable } from '@angular/core';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';
/* Models. */
import { Product } from '@models/models';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProductsService extends BaseService {

    constructor(http: HTTP, events: Events, storage: Storage) {
        super(http, events, storage);
    }

    createProduct(product: Product): Promise<HTTPResponse> {
        let url = 'products';
        return super.post(url, product, {});
    }

    getProduct(productID: number): Promise<HTTPResponse> {
        let url = `products/${productID}`;
        return super.get(url, {}, {});
    }

    updateProduct(productID: number, product: Product): Promise<HTTPResponse> {
        let url = `products/${productID}`;
        return super.patch(url, product, {});
    }

    deleteProduct(productID: number): Promise<HTTPResponse> {
        let url = `products/${productID}`;
        return super.delete(url, {}, {});
    }

    getBrands() : Promise<HTTPResponse> {
        let url = 'products/brands';
        return super.get(url, {}, {});
    }
}
