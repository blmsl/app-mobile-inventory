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

}
