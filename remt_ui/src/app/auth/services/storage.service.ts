import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeInterface } from 'src/app/users/types/userTypes';

@Injectable({providedIn:'root'})
export class StorageService {

  constructor(private router: Router) { }

  saveToken(user: UserTypeInterface){
    localStorage.setItem('userTypeName', user.userTypeName)
    localStorage.setItem('remtUserName', user.userInfos.name);
    localStorage.setItem('remtUserId', user.id);
  }
  getToken(){
    return localStorage.getItem('remtUserName');
  }
  getId(){
    return localStorage.getItem('remtUserId');
  }
  getUserTypeName(){
    return localStorage.getItem('userTypeName');
  }
  removeToken(){
    this.router.navigateByUrl('');
    localStorage.removeItem('userTypeName')
    localStorage.removeItem('remtUserName');
    localStorage.removeItem('remtUserId');
  }
  isLoggedIn(): boolean{
    return this.getToken() ? true : false;
  }
  getUserName(): string | null{
      return this.getToken();
  }
}
