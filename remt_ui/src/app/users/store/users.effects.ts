import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, filter, map, of } from "rxjs";
import { PersonInfoService } from "src/app/auth/services/person-info.service";
import { StorageService } from "src/app/auth/services/storage.service";
import { MessageService } from "src/app/shared/services/message.service";
import { DataSourceService } from "../services/data-source/data-source.service";
import * as usersActions from "./users.actions";

@Injectable()
export class UsersEffects {
  // getAdmin$ = createEffect(()=>this.actions.pipe(
  //   ofType(usersActions.getUser),
  //   exhaustMap(()=>this.dataSourceService.getUserTypes().pipe(
  //     map((users)=>{
  //       console.log(users);
  //       return usersActions.getAdminSuccess({userAdmin:users})
  //     }),
  //     catchError(err=>{
  //       console.log(err);
  //       return of(usersActions.getAdminFailure({error:{
  //         text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
  //         title:'Loading Data Error',
  //         color:'red'
  //       }}))
  //     })
  //   ))
  // ))
  // login$ = createEffect(()=>this.actions.pipe(
  //   ofType(usersActions.login),
  //   exhaustMap((user)=>this.personInfoService.login(user).pipe(
  //     map((users)=>{
  //       this.storageService.saveToken(users as unknown as string);
  //       this.router.navigate([users.userTypeName.toLowerCase()])
  //         this.msgService.message({
  //           title:'Login Success', 
  //           text: users.userInfos.name.toUpperCase()+', Wellcome to Real Estate Management Tanzania',
  //           color:'green'
  //         });
  //       return usersActions.loginSuccess({person:users})
  //     }),
  //     catchError(err=>{
  //       console.log(err);
  //       return of(usersActions.loginFailure({error:{
  //         text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
  //         title:'Login Error',
  //         color:'red'
  //       }}))
  //     })
  //   ))
  // ))
  logout$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.logout),
    exhaustMap((user)=>of(this.storageService.removeToken()).pipe(
      map(()=>{
        console.log('user logged out');
        this.router.navigate(['']);
        this.msgService.message({
            title:'Logout Success', text:'Successfully Logged out from REMT',
            color:'green'
          });
        return usersActions.logoutSuccess({msg:' loggedout'})
      })
    ))
  ))
  // register$ = createEffect(()=>this.actions.pipe(
  //   ofType(usersActions.register),
  //   exhaustMap((user)=>this.personInfoService.register(user).pipe(
  //     map((users)=>{
  //       this.storageService.saveToken(users);
  //       this.router.navigate([users.userTypeName.toLowerCase()])
  //         this.msgService.message({
  //           title:'Login Success', 
  //           text:'Wellcome to Real Estate Management Tanzania '+ users.userInfos.name.toUpperCase(),
  //           color:'green'
  //         });
  //       return usersActions.registerSuccess({person:users})
  //     }),
  //     catchError(err=>{
  //       console.log(err);
  //       return of(usersActions.loginFailure({error:{
  //         text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
  //         title:'Login Error',
  //         color:'red'
  //       }}))
  //     })
  //   ))
  // ))
  search$ = createEffect(()=>this.actions.pipe(
    ofType(usersActions.search),
    exhaustMap((search)=>this.dataSourceService.getUserTypes().pipe(
      filter((users,i)=>{
        console.log(search);
        console.log(i);
        return users[i].userTypeName.toLowerCase().includes(search.search)
      }),
      map((users)=>{
        console.log(users);
        return usersActions.searchSuccess({result:users})
      }),
      catchError(err=>{
        console.log(err);
        return of(usersActions.searchFailure({error:{
          text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
          title:'Loading Data Error',
          color:'red'
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
