import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, HttpResourceUrls, Pluralizer } from '@ngrx/data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpGeneratorService extends DefaultHttpUrlGenerator {

  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }
  protected override getResourceUrls(entityName: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (entityName === 'User') {
      resourceUrls = {
        collectionResourceUrl: environment.apiUrl+'/users/',
        entityResourceUrl: environment.apiUrl+'/users/'
      }
      this.registerHttpResourceUrls({[entityName]: resourceUrls});
    } else if(entityName === 'House') {
      resourceUrls = {
        collectionResourceUrl: environment.apiUrl+'/houses/',
        entityResourceUrl: environment.apiUrl+'/houses/'
      }
      this.registerHttpResourceUrls({[entityName]: resourceUrls});
    }
    return resourceUrls;
  }
}
