import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/auth/services/storage.service';
import { AppStateInterface } from '../types/userTypes';
import * as userActions from "../store/users.actions";

export function LazyLoadGuard (): CanMatchFn{
  return ()=>{
    const storageService: StorageService = inject(StorageService);
    console.log('can load triggered');
    if (storageService.isLoggedIn()) {
      return true;
    }
    const store: Store<AppStateInterface> = inject(Store);
    store.dispatch(userActions.authFailure({
      error: {
        title:'Authentication Error',
        text:'Please Login to access the selected route'
      }
    }))
    const route:Router = inject(Router);
    route.navigate(['auth']);
    return false;
  }
}
