import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StorageService } from '../../auth/services/storage.service';
import { HouseInterface } from '../../users/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class HouseEntityService extends EntityCollectionServiceBase<HouseInterface> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient, private storage: StorageService
    ) {
    super('House', serviceElementsFactory);
  }

  // override add(entity: HouseInterface): Observable<HouseInterface> {
  //   return this.http.post<HouseInterface>(environment.apiUrl+'/houses', entity, {
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     })
  // }
// tenantRentRegister(rent: RentalHistory):Observable<HouseInterface>{
  //   return this.http.post<HouseInterface>(environment.apiUrl+'/houses/'+rent.houseId+'/rental', rent, {
  //     headers: new HttpHeaders({
  //     'Authorization': `Bearer ${this.storage.getToken()}`
  //     })
  //     });
  // }
}
