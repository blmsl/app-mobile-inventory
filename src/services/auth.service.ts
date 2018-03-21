import { Injectable, NgZone } from '@angular/core';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
  // Needed for auth0.
  clientID: 'FK7SHa0ycyrxlGAh9CZOKGVY4MtCQvXd',

  // Needed for auth0cordova.
  clientId: 'FK7SHa0ycyrxlGAh9CZOKGVY4MtCQvXd',
  domain: 'inventory-system.auth0.com',
  callbackURL: location.href,
  packageIdentifier: 'YOUR_PACKAGE_ID'
};

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  /**
   * Service constructor.
   */
  constructor(public zone: NgZone) {
  }
  /**
   * Retrieves the value for a key from localStorage.
   */
  private getStorageValue(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  /**
   * Set the value for a key in the localStorage.
   */
  private setStorageValue(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * True if the user is authenticated, flase otherwise.
   */
  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }
  
  /**
   * Perform a login action.
   */
  public login() {
    // Set up the client.
    const client = new Auth0Cordova(auth0Config);
    // Client options.
    const options = {
      scope: 'openid profile offline_access'
    };
    // Check if the client is authorized.
    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }
      // Update the localStorage.
      // Set the TokenID.
      this.setStorageValue('token_id', authResult.idToken);
      // Set the AccessToken.
      this.setStorageValue('access_token', authResult.accessToken);
      // Set the expiration time.
      const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      this.setStorageValue('expires_at', expiresAt);
      // Fetch user information.
      this.auth0.client.userInfo(authResult.accessToken, (err, userInfo) => {
        if(err) {
          throw err;
        }
        // Validate user metadata.
        userInfo.user_metadata = userInfo.user_metadata || {};
        // If it's ok, set the user information to localStorage.
        this.setStorageValue('user_information', userInfo);
        
        this.zone.run(() => {
          //
        });
      });
    });
  }
  /**
   * Perform the logout action.
   */
  public logout() {
    // Delete all the LocalStorageKeys.
    window.localStorage.removeItem('user_information');
    window.localStorage.removeItem('expires_at');
    window.localStorage.removeItem('token_id');
    window.localStorage.removeItem('access_token');
  }

}