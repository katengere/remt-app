import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, takeWhile } from 'rxjs';
import { userSelector, isLoadingSelector, selectUrl } from 'src/app/users/store/users.selectors';
import { UserTypeInterface, AppStateInterface } from 'src/app/users/types/userTypes';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  permisions!: string[];
  route!: string;
  isLoading$!: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppStateInterface>,
  ){
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>{
        this.store.pipe(select(selectUrl)).subscribe({
          next:(route)=>{
            this.route = route.slice(1);
            this.permisions = users.filter(u=>u.userTypeName.toLowerCase()==this.route.toLowerCase())
        .reduce((acc,{permissions})=>[...acc, ...permissions],[] as string[])
        .filter((p,i,arr)=>arr.indexOf(p)==i);
          }
        });
      }
    });
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  ngOnInit(): void {}
}
