import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/auth/services/storage.service';
import { AppStateInterface } from '../types/userTypes';
import * as userActions from "../store/users.actions";

export function LazyLoadGuard (routeSeg:string): CanMatchFn{
  return ()=>{
    const store: Store<AppStateInterface> = inject(Store);
    const storageService: StorageService = inject(StorageService);
    if (storageService.isLoggedIn() && storageService.getUserTypeName()?.toLowerCase() === routeSeg) {
      return true;
    }
    store.dispatch(userActions.authFailure({
      error: {
        title:'Authentication Error',
        text:'Please Login to access the selected route'
      }
    }))
    const router:Router = inject(Router);
    router.navigate(['']);
    return false;
  }
}
