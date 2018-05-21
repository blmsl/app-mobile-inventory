import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProductsService extends BaseService {

    constructor(http: HTTP, storage: Storage) {
        super(http, storage);
    }

    createProduct(product: any): Promise<HTTPResponse> {
        let headers = { 'Content-Type': 'application/json' };
        let url = environment.api.url + 'products';
        return super.post(url, product, headers);
    }

    getProduct(productID: number): Promise<HTTPResponse> {
        let headers = { 'Content-Type': 'application/json' };
        let url = environment.api.url + 'products/' + productID;
        return super.get(url, {}, headers);
    }

    updateProduct(productID: number, product: any): Promise<HTTPResponse> {
        let headers = { 'Content-Type': 'application/json' };
        let url = environment.api.url + 'products/' + productID;
        return super.patch(url, product, headers);
    }

    deleteProduct(productID: number): Promise<HTTPResponse> {
        let headers = { 'Content-Type': 'application/json' };
        let url = environment.api.url + 'products/' + productID;
        return super.delete(url, {}, headers);
    }
}
