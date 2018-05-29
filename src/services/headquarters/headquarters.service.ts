import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class HeadquartersService extends BaseService {

    constructor(http: HTTP, events: Events) {
        super(http, events);
    }

    getHeadquarter(headquarterID: number): Promise<HTTPResponse> {
        let url = `${environment.api.url}headquarters/${headquarterID}`;
        return super.get(url, {}, {});
    }

    addProduct (headquarterID: number, product: any) : Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `${environment.api.url}headquarters/${headquarterID}/products`;
        return super.post(url, product, headers);
    }

    addProducts (headquarterID: number, products: any) : Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `${environment.api.url}headquarters/${headquarterID}/products`;
        return super.patch(url, products, headers);
    }

    getProduct(headquarterID: number, productID: number) : Promise<HTTPResponse> {
        let url = `${environment.api.url}headquarters/${headquarterID}/products/${productID}`;
        return super.get(url, {}, {});
    }

    getProducts (headquarterID: number, name: string, brand: string, color: string): Promise<HTTPResponse> {
        let url = `${environment.api.url}headquarters/${headquarterID}/products?name=${name}&brand=${brand}&color=${color}`;
        return super.get(url, {}, {});
    }
}
