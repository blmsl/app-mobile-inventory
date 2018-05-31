import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
/* Models. */
import { Product } from '@models/models';
import { Events } from 'ionic-angular';

@Injectable()
export class ProductsService extends BaseService {

    constructor(http: HTTP, events: Events) {
        super(http, events);
    }

    createProduct(product: Product): Promise<HTTPResponse> {
        let url = environment.api.url + 'products';
        return super.post(url, product, {});
    }

    getProduct(productID: number): Promise<HTTPResponse> {
        let url = environment.api.url + 'products/' + productID;
        return super.get(url, {}, {});
    }

    updateProduct(productID: number, product: Product): Promise<HTTPResponse> {
        let url = environment.api.url + 'products/' + productID;
        return super.patch(url, product, {});
    }

    deleteProduct(productID: number): Promise<HTTPResponse> {
        let url = environment.api.url + 'products/' + productID;
        return super.delete(url, {}, {});
    }

    getBrands() : Promise<HTTPResponse> {
        let url = environment.api.url + 'products/brands';
        return super.get(url, {}, {});
    }
}
