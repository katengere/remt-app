import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, takeWhile } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { userSelector, isLoadingSelector, selectUrl } from 'src/app/users/store/users.selectors';
import { AppStateInterface, UserTypeInterface } from 'src/app/users/types/userTypes';
import { logout, search } from '../../users/store/users.actions';
import { UserEntityService } from '../services/user-entity.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';

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
  @Output() sideNav = new EventEmitter();
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private userEntityService: UserEntityService,
    private dialog: MatDialog,
    private storageService: StorageService
  ){
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    combineLatest([this.store.select(selectUrl), this.userEntityService.entities$]).subscribe({
      next:([params, users])=>{           
        this.route = params.slice(1);
        const userType = storageService.getUserTypeName()?.toLowerCase();
        this.logInUser = this.storageService.getUserName();
        this.permisions = users.filter(u=>u.userTypeName.toLowerCase()==this.route.toLowerCase() ||
        u.userTypeName.toLowerCase() == userType)
        .reduce((acc,{permissions})=>[...acc, ...permissions],[] as string[])
        .filter((p,i,arr)=>arr.indexOf(p)==i);
      }
    });
    this.isLoading$ = userEntityService.loading$;
  }
  displaySideNav(){
    this.sideNav.emit();
  }
  registerDialog(){
    this.dialog.open(RegisterComponent)
  }
  logout(){
    this.store.dispatch(logout());
    this.userEntityService.getAll();
  }
  ngOnInit(): void {
  }
  search(value:string): void {
    console.log(value);
    this.userEntityService.setFilter(value)
  }
}
