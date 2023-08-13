import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class StorageService {

  constructor(private router: Router) { }

  saveToken(token:string){
    return localStorage.setItem('remtUser', token);
  }
  getToken(){
    return localStorage.getItem('remtUser');
  }
  removeToken(){
    this.router.navigateByUrl('');
    return localStorage.removeItem('remtUser');
  }
  isLoggedIn(): boolean{
    return this.getToken() ? true : false;
  }
  getUserName(): string | null{
      return this.getToken();
  }
}
