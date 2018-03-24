import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageUtil {
 
 private avatar: any;
 
 /**
  * Set the value for a key in the localStorage.
  */
 public setStorageValue(key, value) {
   window.localStorage.setItem(key, JSON.stringify(value));
 }
  
 /**
  * Retrieves the value for a key from localStorage.
  */
 public getStorageValue(key) {
   return JSON.parse(window.localStorage.getItem(key));
 }
 
 public getAvatar() : any {
  if (!this.avatar) {
   /*console.log('avatar undefined.');*/
   this.avatar = {
    size: 60,
    background: '#26a69a',
    fontColor: '#FFFFFF',
    border: "none",
    isSquare: false,
    text: "GoStock"
   };
  }
  return this.avatar;
 }
    
}