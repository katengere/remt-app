import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { selectUrl, userSelector } from '../users/store/users.selectors';
import { UserTypeInterface, AppStateInterface } from '../users/types/userTypes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  @ViewChild('sidenav') sidenav: any;
  user$!: UserTypeInterface[];
  route!: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppStateInterface>
    ){
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>{this.user$ = users; console.log(users);
      }
    });
    this.store.pipe(select(selectUrl)).subscribe({
      next:(route)=>{
        this.route = route.slice(1);
        console.log(this.route);
        this.user$ = this.user$.filter(u=>u.userTypeName.toLowerCase()==this.route || u.userTypeName.toLowerCase());
      }
    });
  }
  ngOnInit(): void {}
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
