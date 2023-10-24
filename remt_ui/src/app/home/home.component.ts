import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { userSelector } from '../users/store/users.selectors';
import * as userActions from '../users/store/users.actions';
import { UserTypeInterface, AppStateInterface } from '../users/types/userTypes';
import { StorageService } from '../auth/services/storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserEntityService } from '../shared/services/user-entity.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  @ViewChild('sidenav') sidenav: any;
  user$!: UserTypeInterface[];
  route!: string;
  username!: string | null;
  userTypeNames!:string[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppStateInterface>,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private userEntityService: UserEntityService,
    ){
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    this.userEntityService.entities$.subscribe({
      next:(users)=>{
        this.user$ = users;
        this.username = this.storageService.getUserName();
        this.userTypeNames= users.map(u=>u.userTypeName.toLowerCase())
          .filter((n,i,arr)=>arr.indexOf(n)==i);
      }
    });

  }
  loginDialog(){
    this.dialog.open(LoginComponent)
  }
  
  logout() {
    this.store.dispatch(userActions.logout());
    this.userEntityService.getAll();
    this.router.navigate([''])
    }
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
