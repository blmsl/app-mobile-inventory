import { Injectable, NgZone } from '@angular/core';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
/** Services. */
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';

const options = {
  clientID: environment.auth0.clientid,
  clientId: environment.auth0.clientid,
  domain: environment.auth0.domain,
  responseType: 'token id_token',
  audience: environment.auth0.audience,
  redirectUri: environment.auth0.callback,
  scope: environment.auth0.scope,
  callbackURL: environment.auth0.callback,
  packageIdentifier: environment.auth0.packageId
};

@Injectable()
export class AuthService {
  
   /** Application web auths. There will be one for each api to which we connect. */
  webAuth = new auth0.WebAuth(options);
  
  authCordova = new Auth0Cordova(options);
  /**
   * Service constructor.
   */
  constructor(public zone: NgZone, private cookieService: CookieService) {
  }
  
  /**
   * True if the user is authenticated, flase otherwise.
   */
  public isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time.
    const expiresAtValue: string = this.cookieService.get('expires_at');
    let expiresAt = new Date().getTime();
    if (expiresAtValue && expiresAtValue.length > 0) {
     expiresAt = JSON.parse(expiresAtValue);
    }
    return new Date().getTime() < expiresAt;
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
        throw err;
      }
      // Fetch user information.
      this.webAuth.client.userInfo(authResult.accessToken, (err, userInfo) => {
        if(err) {
          throw err;
        }
        // Validate user metadata.
        userInfo.user_metadata = userInfo.user_metadata || {};
        // If it's ok, set session.
        this.setSession(authResult, userInfo);
        //
        this.zone.run(() => {
          //
        });
      });
    });
  }
  
  private setSession(authResult: any, userInfo: any): void {
    // Setup user information.
    this.cookieService.set('user_information', userInfo);
    // Set up customer_id.
    this.cookieService.set('customer_id', 
      authResult.idTokenPayload['https://inventory-system-web/customer_id']);
    // Setup scopes.
    const scopes = authResult.scope || environment.auth0.scope || '';
    this.cookieService.set('scopes', JSON.stringify(scopes));
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    this.cookieService.set('access_token', authResult.accessToken);
    this.cookieService.set('id_token', authResult.idToken);
    this.cookieService.set('expires_at', expiresAt);
  }
  /**
   * Perform the logout action.
   */
  public logout(): void {
    // Remove cookies.
    this.cookieService.delete('user_information');
    this.cookieService.delete('customer_id');
    this.cookieService.delete('access_token');
    this.cookieService.delete('id_token');
    this.cookieService.delete('expires_at');
    this.cookieService.delete('scopes');
  }

}