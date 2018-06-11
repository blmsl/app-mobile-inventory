import { Injectable } from '@angular/core';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class BillsService extends BaseService {

    constructor(http: HTTP, events: Events, storage: Storage) {
        super(http, events, storage);
    }

    createBill(bill: any) : Promise<HTTPResponse> {
        let url = 'bills';
        return super.post(url, bill, {});
    }

    getBills(from: string, to: string) : Promise<HTTPResponse> {
        let url = `bills?from=${from}&to=${to}`;
        return super.get(url, {}, {});
    }
}
