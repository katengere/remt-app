import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usersActions from "./users.actions";
import { catchError, exhaustMap, from, map, of } from "rxjs";
import { DataSourceService } from "../services/data-source/data-source.service";
import { PersonInfoService } from "src/app/auth/services/person-info.service";
import { StorageService } from "src/app/auth/services/storage.service";
import { MessageService } from "src/app/shared/services/message.service";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {
  getAdmin$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.getUser),
    exhaustMap(()=>this.dataSourceService.getUserTypes().pipe(
      map((users)=>{
        console.log(users);
        return usersActions.getAdminSuccess({userAdmin:users})
      }),
      catchError(err=>{
        console.log(err);
        return of(usersActions.getAdminFailure({error:{
          text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
          title:'Loading Data Error'
        }}))
      })
    ))
  ))
  login$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.login),
    exhaustMap((user)=>this.personInfoService.login(user).pipe(
      map((users)=>{
        console.log(users);
        this.storageService.saveToken(users.userInfos.name, users.userTypeName);
        this.router.navigate([users.userTypeName.toLowerCase()])
          this.msgService.message({
            title:'Login Success', text: users.userInfos.name.toUpperCase()+', Wellcome to Real Estate Management Tanzania'}, 'bg-success');
        return usersActions.loginSuccess({person:users})
      }),
      catchError(err=>{
        console.log(err);
        return of(usersActions.loginFailure({error:{
          text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
          title:'Login Error'
        }}))
      })
    ))
  ))
  logout$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.logout),
    exhaustMap((user)=>of(this.storageService.removeToken()).pipe(
      map(()=>{
        console.log('user logged out');
        this.router.navigate(['']);
        this.msgService.message({
            title:'Logout Success', text:'Successfully Logged out from REMT'
          }, 'bg-success');
        return usersActions.logoutSuccess({msg:' loggedout'})
      })
    ))
  ))
  register$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.register),
    exhaustMap((user)=>this.personInfoService.register(user).pipe(
      map((users)=>{
        console.log(users);
        this.storageService.saveToken(users.userInfos.name, users.userTypeName);
        this.router.navigate([users.userTypeName.toLowerCase()])
          this.msgService.message({
            title:'Login Success', text:'Wellcome to Real Estate Management Tanzania '+ users.userInfos.name.toUpperCase()}, 'bg-success');
        return usersActions.registerSuccess({person:users})
      }),
      catchError(err=>{
        console.log(err);
        return of(usersActions.loginFailure({error:{
          text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
          title:'Login Error'
        }}))
      })
    ))
  ))
  constructor(
    private actions:Actions,
    private router: Router,
    private dataSourceService: DataSourceService,
    private personInfoService: PersonInfoService,
    private msgService: MessageService,
    private storageService: StorageService
    ) {}
}
