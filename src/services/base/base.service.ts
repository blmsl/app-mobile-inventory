import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
/* Services. */
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class BaseService {

    constructor(protected http: HTTP,
        private storage: Storage) {
        this.storage.get('customer_id').then(customerID => {
            this.http.setCookie(environment.api.url, 'customer_id=' + customerID);
        });
    }

    protected post(url: string, model: any, headers: any): Promise<HTTPResponse> {
        /* var json = JSON.stringify(model); */
        return this.http.post(url, model, headers);
    }

    protected patch(url: string, model: any, headers: any): Promise<HTTPResponse> {
        /* var json = JSON.stringify(model); */
        return this.http.patch(url, model, headers);
    }

    protected get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        return this.http.get(url, parameters, headers);
    }

    protected delete(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        return this.http.delete(url, parameters, headers);
    }

}
