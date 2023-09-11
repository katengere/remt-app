import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, takeWhile } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { userSelector, isLoadingSelector, selectUrl } from 'src/app/users/store/users.selectors';
import { AppStateInterface, UserTypeInterface } from 'src/app/users/types/userTypes';
import { logout, search } from "../../users/store/users.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  permisions!: string[];
  isLoading$!: Observable<boolean>;
  route!: string;
  logInUser!: string | null;
  userTypeSearch!: string;
  @Output() sideNav = new EventEmitter()
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppStateInterface>,
    private storageService: StorageService
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
            this.logInUser = storageService.getUserName();
            this.permisions = users.filter(u=>u.userTypeName.toLowerCase()==this.route.toLowerCase())
        .reduce((acc,{permissions})=>[...acc, ...permissions],[] as string[])
        .filter((p,i,arr)=>arr.indexOf(p)==i);
          }
        });
      }
    });
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
  displaySideNav(){
    this.sideNav.emit();
  }
  logout(){
    this.store.dispatch(logout());
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: string): void {
    console.log(changes);
    this.store.dispatch(search({search:this.userTypeSearch}))
  }
}
