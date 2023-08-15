import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class StorageService {

  constructor(private router: Router) { }

  saveToken(token:string, userTypeName:string){
    localStorage.setItem('userTypeName', userTypeName)
    localStorage.setItem('remtUserToken', token);
  }
  getToken(){
    return localStorage.getItem('remtUserToken');
  }
  getUserTypeName(){
    return localStorage.getItem('userTypeName');
  }
  removeToken(){
    this.router.navigateByUrl('');
    return localStorage.removeItem('remtUserToken');
  }
  isLoggedIn(): boolean{
    return this.getToken() ? true : false;
  }
  getUserName(): string | null{
      return this.getToken();
  }
}
