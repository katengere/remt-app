import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { StorageService } from '../../auth/services/storage.service';
import { httpOptions } from './house-data.service';

const latitude = -6.8059136, longitude = 39.2331264;

const options = { params: new HttpParams().set('lng', longitude) };

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DefaultDataService<UserTypeInterface> {
  private token: string;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private storage: StorageService) {
    super('User', http, httpUrlGenerator);
    this.token = this.storage.getToken();
  }

  override add(entity: UserTypeInterface): Observable<UserTypeInterface> {
    return super.add(entity, {
      httpParams: { fromObject: { adminId: this.storage.getId() } }
    })
  }

  override getAll(): Observable<UserTypeInterface[]> {
    // console.log('coordnates are ', pos);    
    // if (!pos) {
    //   pos = {lat:-6.8059136, lng: 39.2331264}
    // }
    return super.getAll({ httpParams: { fromString: 'lng' } });
  }
  override getById(key: string): Observable<UserTypeInterface> {
    return super.getById(key, httpOptions(this.token))
  }
  override update(update: Update<UserTypeInterface>): Observable<UserTypeInterface> {
    console.log('user data serv update called ', update);

    return super.update(update, {
      httpHeaders: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      },
      httpParams: { fromObject: { action: update.changes.action as string, user: this.storage.getUserTypeName() as string } }
    })
  }
  override delete(key: string | number): Observable<string | number> {
    return super.delete(key, {
      httpHeaders: {
        'Authorization': `Bearer ${this.storage.getToken()}`
      },
      httpParams: { fromObject: { adminId: this.storage.getId() } }
    })
  }
}
