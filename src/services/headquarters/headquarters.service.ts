import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class HeadquartersService extends BaseService {

    constructor(http: HTTP, storage: Storage) {
        super(http, storage);
    }

    getHeadquarter(headquarterID: number): Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };
        let url = environment.api.url + 'headquarters/' + headquarterID;
        return super.get(url, {}, headers);
    }

    addProduct (headquarterID: number, product: any) : Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `${environment.api.url}headquarters/${headquarterID}/products`;
        return super.patch(url, product, headers);
    }

    getProducts (headquarterID: number, name: string, brand: string, color: string): Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };        
        let url = `${environment.api.url}headquarters/${headquarterID}/products?name=${name}&brand=${brand}&color=${color}`;
        return super.get(url, {}, headers);
    }
}
