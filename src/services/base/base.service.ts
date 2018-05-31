import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { constants } from '@app/app.constants';

@Injectable()
export class BaseService {

    constructor(protected http: HTTP,
        private events: Events) {
        this.http.setDataSerializer('json');
        this.events.subscribe(constants.topics.cookies.put, (value) => {
            this.http.setCookie(environment.api.url, value);
        });
        this.events.subscribe(constants.topics.cookies.clear, (value) => {
            this.http.clearCookies();
        });
    }

    protected post(url: string, model: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        headers['charset'] = 'UTF-8';
        return this.http.post(url, model, headers);
    }

    protected patch(url: string, model: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        headers['charset'] = 'UTF-8';
        return this.http.patch(url, model, headers);
    }

    protected get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        return this.http.get(url, parameters, headers);
    }

    protected delete(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        return this.http.delete(url, parameters, headers);
    }

}
