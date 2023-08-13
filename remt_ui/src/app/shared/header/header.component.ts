import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, takeWhile } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { userSelector, isLoadingSelector, selectUrl } from 'src/app/users/store/users.selectors';
import { AppStateInterface, UserTypeInterface } from 'src/app/users/types/userTypes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  user$!: UserTypeInterface[];
  isLoading$!: Observable<boolean>;
  route!: string;
  logInUser!: string | null;
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
      next:(users)=>this.user$ = users
    });
    this.store.pipe(select(selectUrl)).subscribe({
      next:(route)=>{
        this.route = route.slice(1);
        this.logInUser = storageService.getUserName();
        this.user$ = this.user$.filter(u=>u.userTypeName.toLowerCase()==this.route);
      }
    });
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  displaySideNav(){
    this.sideNav.emit();
  }

  ngOnInit(): void {
  }
}
