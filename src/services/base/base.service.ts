import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
/* Services. */
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { constants } from '@app/app.constants';

@Injectable()
export class BaseService {

    protected urlbase: string;

    constructor(protected http: HTTP,
        private events: Events) {
        this.http.setDataSerializer('json');
        this.events.subscribe(constants.topics.cookies.put, (value) => {
            this.http.setCookie(environment.api.url, value);
        });
        this.events.subscribe(constants.topics.cookies.clear, (value) => {
            this.http.clearCookies();
        });
        this.urlbase = environment.api.url;
    }

    protected post(url: string, model: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        headers['charset'] = 'UTF-8';
        return this.http.post(`${this.urlbase}${url}`, model, headers);
    }

    protected patch(url: string, model: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        headers['charset'] = 'UTF-8';
        return this.http.patch(`${this.urlbase}${url}`, model, headers);
    }

    protected get(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        return this.http.get(`${this.urlbase}${url}`, parameters, headers);
    }

    protected delete(url: string, parameters: any, headers: any): Promise<HTTPResponse> {
        headers = headers || {};
        return this.http.delete(`${this.urlbase}${url}`, parameters, headers);
    }

}
