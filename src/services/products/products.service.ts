import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
/* Services. */
import { BaseService } from '@services/base/base.service';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
/* Models. */

@Injectable()
export class UsersService extends BaseService {
 
 constructor(http: HTTP, storage: Storage) {
  super(http, storage);
 }
 
 createProduct(product: any) {
  
 }

}
