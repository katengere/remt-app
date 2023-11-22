import { Injectable } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserTypeInterface } from 'src/app/users/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DefaultDataService<UserTypeInterface> {

  constructor( http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('User', http, httpUrlGenerator);
    httpUrlGenerator.registerHttpResourceUrls();
  }
  override add(entity: UserTypeInterface): Observable<UserTypeInterface> {
    console.log(entity);
    
    if (entity.userInfos.age!=null|| entity.userInfos.nationId!=null) {      
    return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/register', entity);
  } 
    return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/login', entity);
  }
}
