import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth/services/storage.service';
import { HouseInterface, RentalHistory } from '../../users/types/userTypes';

export const httpOptions = (token: string): HttpOptions => ({
  httpHeaders: {
    'Authorization': `Bearer ${token}`
  }
})

@Injectable({
  providedIn: 'root'
})
export class HouseDataService extends DefaultDataService<HouseInterface> {
  private token: string;
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private storage: StorageService) {
    super('House', http, httpUrlGenerator);
    this.token = this.storage.getToken();
  }
  override getAll(options?: HttpOptions | undefined): Observable<HouseInterface[]> {
    console.log('get all call with token ', this.token);

    return super.getAll(httpOptions(this.token));

  }
  override add(entity: HouseInterface): Observable<HouseInterface> {
    return super.add(entity, httpOptions(this.token));
  }
  override update(update: Update<RentalHistory>): Observable<HouseInterface> {
    console.log('update house  argument ', update);
    if (update.changes.action) {
      return super.update(update, {
        httpHeaders: {
          'Authorization': `Bearer ${this.storage.getToken()}`
        },
        httpParams: { fromObject: { action: update.changes.action } }
      });
    }
    return super.update(update, httpOptions(this.token));
  }

}
