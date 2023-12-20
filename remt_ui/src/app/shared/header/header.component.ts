import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, takeWhile } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { selectUrl } from 'src/app/users/store/users.selectors';
import { RegisterComponent } from '../../auth/register/register.component';
import { logout } from '../../users/store/users.actions';
import { formatUrl } from '../../users/types/usefulFunctions';
import { UserEntityService } from '../services/user-entity.service';

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
  route!: string;
  userType: string | undefined;
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
   
  }
  displaySideNav(){
    this.sideNav.emit();
  }
  registerDialog(){
    this.dialog.open(RegisterComponent, {
      data: {user: {}, action:'Register'}
    })
  }
  logout(){
    this.store.dispatch(logout());
    this.userEntityService.getAll();
  }
  ngOnInit(): void {
    combineLatest([this.store.select(selectUrl), this.userEntityService.entities$]).subscribe({
      next:([url,users])=>{
        this.route = formatUrl(url);
        this.userType = this.storageService.getUserTypeName()?.toLowerCase();        
        this.logInUser = this.storageService.getUserName();
        this.permisions = users.filter(u=>u.userTypeName.toLowerCase()==this.userType ||
        u.userTypeName.toLowerCase() == this.userType)
        .reduce((acc,{permissions})=>[...acc, ...permissions],[] as string[])
        .filter((p,i,arr)=>arr.indexOf(p)==i);
      }
    });
  }
  search(value:string): void {
    this.userEntityService.setFilter(value)
  }
}
