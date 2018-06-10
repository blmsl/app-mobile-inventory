import { Injectable } from '@angular/core';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class CustomersService extends BaseService {

    constructor(http: HTTP, events: Events) {
        super(http, events);
    }

    getCustomer(): Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };
        let url = 'customers';
        return super.get(url, {}, headers);
    }

}
