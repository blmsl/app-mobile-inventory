import { Injectable, NgZone } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
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
export class AuthService {
  
   /** Application web auths. There will be one for each api to which we connect. */
  webAuth = new auth0.WebAuth(options);
  
  authCordova = new Auth0Cordova(options);

  loggedIn : boolean = false;
  /**
   * Service constructor.
   */
  constructor(private zone: NgZone, 
    private storage: Storage
    ) {
      this.storage.get('expires_at').then(expiresAtValue => {
        console.log(expiresAtValue);
        this.loggedIn = Date.now() < JSON.parse(expiresAtValue);
      });
  }
  
  /**
   * True if the user is authenticated, flase otherwise.
   */
  public isAuthenticated() : boolean{
    /* console.log(this.loggedIn); */
    return this.loggedIn;
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
      if(err) {
        // TODO: Handle error.
        console.log("Error authorizing: " + JSON.stringify(err));
        throw err;
      }
      // Fetch user information.
      this.webAuth.client.userInfo(authResult.accessToken, (err, userInfo) => {
        if(err) {
          // TODO: Handle error.
          console.log("Error getting user information: " + JSON.stringify(err));
          throw err; 
        }
        // Validate user metadata.
        userInfo.user_metadata = userInfo.user_metadata || {};        
        // Validate app metadata.
        userInfo.app_metadata = userInfo.app_metadata || {};
        // If it's ok, set session.
        this.setSession(authResult, userInfo);
        // Set logged in.
        this.loggedIn = true;
        this.zone.run(() => {          
        });
      });
    });
  }
  
  private setSession(authResult: any, userInfo: any): void {
    console.log(JSON.stringify(authResult));
    console.log(JSON.stringify(userInfo));
    // Setup user information.
    this.storage.set('user_information', userInfo);
    // Set up customer_id.
    /* this.storage.set('customer_id', 
      authResult.idTokenPayload['https://inventory-system-web/customer_id']); */
    // Setup scopes.
    const scopes = authResult.scope || environment.auth0.scope || '';
    this.storage.set('scopes', JSON.stringify(scopes));
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    this.storage.set('access_token', authResult.accessToken);
    this.storage.set('id_token', authResult.idToken);
    this.storage.set('expires_at', expiresAt);    
  }
  /**
   * Perform the logout action.
   */
  public logout(): void {
    /* console.log(JSON.stringify(this.storage)); */
    // Remove cookies.
    this.storage.remove('user_information');
    this.storage.remove('customer_id');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    this.storage.remove('scopes');
    // Clear storage.
    /* this.storage.clear(); */
    // Set logged in.
    this.loggedIn = false;
  }

}