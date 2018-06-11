import { Injectable } from '@angular/core';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class HeadquartersService extends BaseService {

    constructor(http: HTTP, events: Events, storage: Storage) {
        super(http, events, storage);
    }

    getHeadquarter(headquarterID: number): Promise<HTTPResponse> {
        let url = `headquarters/${headquarterID}`;
        return super.get(url, {}, {});
    }

    addProduct (headquarterID: number, product: any) : Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `headquarters/${headquarterID}/products`;
        return super.post(url, product, headers);
    }
    
    updateProduct( headquarterID: number, productID: number, product: any) : Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `headquarters/${headquarterID}/products/${productID}`;
        return super.patch(url, product, headers);
    }

    getProduct(headquarterID: number, productID: number) : Promise<HTTPResponse> {
        let url = `headquarters/${headquarterID}/products/${productID}`;
        return super.get(url, {}, {});
    }

    getProducts (headquarterID: number, name: string, brand: string, color: string): Promise<HTTPResponse> {
        let url = `headquarters/${headquarterID}/products?name=${name}&brand=${brand}&color=${color}`;
        return super.get(url, {}, {});
    }

    getBills(headquarterID: number, from: string, to: string) : Promise<HTTPResponse> {
        let url = `headquarters/${headquarterID}/bills?from=${from}&to=${to}`;
        return super.get(url, {}, {});
    }
} 
