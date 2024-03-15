import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class StorageService {

  constructor(private router: Router) { }

  saveToken(token: string){
    localStorage.setItem('remtUser', token);
  }
  getToken(): string{
    return localStorage.getItem('remtUser') as string;
  }
  getId(): string {
    const payload = this.getToken() ? JSON.parse(atob(this.getToken().split('.')[1])) : undefined;
    if (payload) {
      return payload._id;
    }
    return '';
  }
  getUserTypeName(){
    const payload = this.getToken() ? JSON.parse(atob(this.getToken().split('.')[1])) : undefined;
    if (payload) {
      return payload.userTypeName;
    }
    return undefined;
  }
  removeToken(){
    this.router.navigateByUrl('');    
    localStorage.removeItem('remtUser');
  }
  isLoggedIn(): boolean{
    const token: string = this.getToken();
if (token) {
const payload = this.getToken() ? JSON.parse(atob(this.getToken().split('.')[1])) : undefined;
return payload.exp > (Date.now() / 1000);
} else {
return false;
}

}
  getUserName(): string | undefined{
    const payload = this.getToken() ? JSON.parse(atob(this.getToken().split('.')[1])) : undefined;
    if (payload) {
      return payload.name;
    }    
    return undefined;
  }
}
