import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { environment } from "../../../environments/environment";

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
  timeout: 3000, // request timeout
}

@Injectable({
  providedIn: 'root'
})
export class UserEntityService extends EntityCollectionServiceBase<UserTypeInterface> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}
