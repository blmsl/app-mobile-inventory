import { Injectable } from '@angular/core';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';

@Injectable()
export class UsersService extends BaseService {

    constructor(http: HTTP, events: Events) {
        super(http, events);
    }

    getUser(userID: string): Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };
        let url = `users/${userID}`;
        return super.get(url, {}, headers);
    }

    updateUser(userID: string, user: any): Promise<HTTPResponse> {
        let headers = {'Content-Type': 'application/json' };
        let url = `users/${userID}`;
        return super.patch(url, user, headers);
    }
}
