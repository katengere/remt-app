import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonInfoInterface, UserTypeInterface } from 'src/app/users/types/userTypes';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({providedIn:'root'})
export class PersonInfoService {

  constructor(private http: HttpClient) { }

  login(user: PersonInfoInterface):Observable<UserTypeInterface>{
    return this.http.post<UserTypeInterface>(apiUrl+'/remt/auth/login', user);
  }
  register(user: PersonInfoInterface):Observable<UserTypeInterface>{
    return this.http.post<UserTypeInterface>(apiUrl+'/remt/auth/register', user);
  }
}
