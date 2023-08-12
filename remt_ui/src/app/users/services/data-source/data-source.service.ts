import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTypeInterface } from '../../types/userTypes';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class DataSourceService {

  constructor(private http:HttpClient) { }

  getUserTypes():Observable<UserTypeInterface[]>{
    return this.http.get<UserTypeInterface[]>(apiUrl+'/remt');
  }
}
