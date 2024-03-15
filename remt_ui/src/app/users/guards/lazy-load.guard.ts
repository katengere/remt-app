import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/auth/services/storage.service';
import { MessageService } from '../../shared/services/message.service';
import { AppStateInterface } from '../types/userTypes';

export function LazyLoadGuard (routeSeg:string): CanMatchFn{
  return ()=>{
    const store: Store<AppStateInterface> = inject(Store);
    const storageService: StorageService = inject(StorageService);
    const router:Router = inject(Router);
    const msgService: MessageService = inject(MessageService);
    if (storageService.isLoggedIn() && storageService.getUserTypeName()?.toLowerCase() === routeSeg) {
      return true;
    }
    msgService.message({
      title:'Authentication Error',
      text:'Please Login to access the selected route',
      color:'red'
    });
    storageService.removeToken();
    window.location.reload();
    router.navigate(['']);
    return false;
  }
}
