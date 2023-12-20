import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DefaultDataService<UserTypeInterface> {
  private id!: string;
  constructor( http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private storage: StorageService) {
    super('User', http, httpUrlGenerator);
    httpUrlGenerator.registerHttpResourceUrls();
  }
  override add(entity: UserTypeInterface): Observable<UserTypeInterface> {  
    this.id = this.storage.getId() as string;
    if (entity.userInfos.age!=null|| entity.userInfos.nationId!=null) {      
    return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/register/'+this.id, entity);
  } 
    return this.http.post<UserTypeInterface>(environment.apiUrl+'/users/login', entity);
  }
  override getById(key: string ): Observable<UserTypeInterface> {
    console.log('getById method call override');
    
    return this.http.get<UserTypeInterface>(environment.apiUrl+'/users/'+key);
  }
}
