import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { selectUrl } from '../../users/store/users.selectors';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private urls: string[] = [];
  url!: string;

  constructor(
    private router: Router,
    private store: Store
    ) {
  this.router.events.pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
  .subscribe((routerEvent) => {
  const url = routerEvent as unknown as string;
  this.urls = [...this.urls, url];  
  });
  this.store.select(selectUrl).subscribe({
    next: (url) => {        
      const urlSegments = url.split('/');
      if (urlSegments.length>3) {
          urlSegments.pop();
          return this.url = urlSegments.join('/');
      }
      this.url = urlSegments.join('/')+'/manage_users';
      console.log('adjasted url ', this.url);
      return this.url;
    },
  });
  }
  

  getPreviousUrl(): string {
    const length = this.urls.length;
    console.log('urls history ', this.urls);
    return length > 1 ? this.urls[length - 2] : '/';
  }
}
