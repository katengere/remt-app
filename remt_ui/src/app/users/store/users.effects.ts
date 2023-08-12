import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usersActions from "./users.actions";
import { catchError, exhaustMap, from, map, of } from "rxjs";
import { dataSource } from "../types/data";
import { DataSourceService } from "../services/data-source/data-source.service";

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
        return of(usersActions.getAdminFailure({error:err.message}))
      })
    ))
  ))
  constructor(
    private actions:Actions,
    private dataSourceService: DataSourceService
    ) {}
}
