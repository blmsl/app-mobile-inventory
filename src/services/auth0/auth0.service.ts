import { Injectable, NgZone } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { Events } from 'ionic-angular';
/** Services. */
import { Storage } from '@ionic/storage';
import { environment } from '@environments/environment';

const options = {
  clientID: environment.auth0.clientid,
  clientId: environment.auth0.clientid,
  domain: environment.auth0.domain,
  packageIdentifier: environment.auth0.packageIdentifier
};

@Injectable()
export class Auth0Service {

  /** Application web auths. There will be one for each api to which we connect. */
  webAuth = new auth0.WebAuth(options);

  authCordova = new Auth0Cordova(options);

  accessToken: string;
  idToken: string;
  expiresAt: any;
  scopes: string;
  userInformation: any;
  customerID: string;
  /**
   * Service constructor.
   */
  constructor(private zone: NgZone,
    private storage: Storage,
    private events: Events
  ) {
    this.storage.get('access_token').then(accessToken => {
      this.accessToken = accessToken;
    });
    this.storage.get('id_token').then(idToken => {
      this.idToken = idToken;
    });
    this.storage.get('expires_at').then(expiresAt => {
      this.expiresAt = expiresAt;
      this.events.publish('storage:opened', this.expiresAt);
    });
    this.storage.get('scopes').then(scopes => {
      this.scopes = scopes;
    });
    this.storage.get('user_information').then(userInformation => {
      this.userInformation = userInformation;
    });
    this.storage.get('customer_id').then(customerID => {
      this.customerID = customerID;
    });
  }

  /* @deprecated('async/wait does not work on android platform.') */
  async getFromStorageAsync(key: string): Promise<void> {
    return await this.storage.get(key);
  }

  /**
   * True if the user is authenticated, flase otherwise.
   */
  public isAuthenticated(): boolean {
    /* console.log(JSON.stringify(this.expiresAt)); */
    let expires: any = Date.now();
    if (this.expiresAt && this.expiresAt.length > 0) {
      try {
        expires = JSON.parse(this.expiresAt);
      } catch (err) {
        console.log("this.expiresAt was not configured correctly. " + JSON.stringify(err));
      }
    }
    return Date.now() < expires;
  }

  /**
   * Perform a login action.
   */
  public login() {
    const opts = {
      scope: environment.auth0.scope
    };
    // Check if the client is authorized.
    this.authCordova.authorize(opts, (err, authResult) => {
      if (err) {
        // TODO: Handle error.
        console.log("Error authorizing: " + JSON.stringify(err));
        throw err;
      }
      /* console.log(JSON.stringify(authResult)); */
      // Fetch user information.
      this.webAuth.client.userInfo(authResult.accessToken, (err, userInfo) => {
        if (err) {
          // TODO: Handle error.
          console.log("Error getting user information: " + JSON.stringify(err));
          throw err;
        }
        /* console.log(JSON.stringify(userInfo)); */
        // Validate app metadata.
        userInfo.app_metadata = userInfo['https://inventory-system-mobile/app_metadata'] || {};
        // If it's ok, set session.
        this.setSession(authResult, userInfo);
        this.zone.run(() => {
        });
      });
    });
  }

  private setSession(authResult: any, userInfo: any): void {
    console.log(JSON.stringify(authResult));
    console.log(JSON.stringify(userInfo));

    this.storage.set('access_token', authResult.accessToken);
    this.accessToken = authResult.accessToken;
    this.storage.set('id_token', authResult.idToken);
    this.idToken = authResult.idToken;
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log(expiresAt);
    this.storage.set('expires_at', expiresAt);
    this.expiresAt = expiresAt;
    this.events.publish('storage:opened', this.expiresAt);
    // Setup scopes.
    const scopes = authResult.scope || environment.auth0.scope || '';
    this.storage.set('scopes', JSON.stringify(scopes));
    this.scopes = scopes;
    // Setup user information.    
    this.storage.set('user_information', userInfo);
    this.userInformation = userInfo;
    // Set up customer_id.
    this.storage.set('customer_id', userInfo['https://inventory-system-mobile/customer_id']);
    this.customerID = userInfo['https://inventory-system-mobile/customer_id'];
  }
  /**
   * Perform the logout action.
   */
  public logout(): void {
    /* console.log(JSON.stringify(this.storage)); */
    // Remove cookies. 
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    this.storage.remove('scopes');
    this.storage.remove('user_information');
    this.storage.remove('customer_id');
    // Clear storage.
    /* this.storage.clear(); */
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;
    this.scopes = null;
    this.userInformation = null;
    this.customerID = null;
  }

}